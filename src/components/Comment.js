import React, { forwardRef, useContext, useEffect, useState } from "react";
import "./styles/Comment.css";
import { capitalizeFirstLetter } from "./Capitalizer";
import { makeStyles, IconButton, Button } from "@material-ui/core";
import { getTimeDiff } from "./TimeMaths";
import firebase from "firebase";
import loadingImage from "../res/profile_comment_loading.png";
import { UserContext } from "../providers/UserProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import pacmanLoading from "../res/pacman.svg";
import Reply from "./Reply";

const Comment = forwardRef(({ comment, id }, ref) => {
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [timeDiff, setTimeDiff] = useState("");
  const [loaded, setLoaded] = useState("");
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [replyOpen, setReplyOpen] = useState(false);
  const classes = useStyles();
  const user = useContext(UserContext);
  const [lastEntry, setLastEntry] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    var unmounted = false;
    if (!unmounted) {
      firebase
        .firestore()
        .collection("replies")
        .orderBy("timestampPosted", "desc")
        .limit(15)
        .where("commentID", "==", id)
        .onSnapshot((snapshot) => {
          if (snapshot.docs.length > 0) {
            setReplies(snapshot.docs.map((doc) => ({ id: doc.id, reply: doc.data() })));
            setLastEntry(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(true);
          } else {
            setHasMore(false);
          }
        });
    }
    return () => (unmounted = true);
  }, [id]);

  const sendReply = () => {
    if (replyOpen) {
      if (user) {
        if (reply.length >= 1) {
          firebase.firestore().collection("replies").add({
            commentID: id,
            reply: reply,
            timestampPosted: firebase.firestore.FieldValue.serverTimestamp(),
            postedBy: user.uid,
          });
          setReply("");
        } else {
          document.getElementById("error").innerHTML = "Start typing to reply";
        }
      } else {
        document.getElementById("error").innerHTML = "Please <a style=' color: #e6e6e6;' href='/login'>login here</a> to post comments";
      }
    }
    setReplyOpen(!replyOpen);
  };

  useEffect(() => {
    var docRef = firebase.firestore().collection("Users").doc(comment.postedBy);
    setTimeDiff(getTimeDiff(comment.timestampPosted));
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setPhotoURL(doc.data().photoURL);
          setDisplayName(doc.data().displayName);
        } else {
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [comment.timestampPosted, comment.postedBy]);
  const commentLoadingStyle = !loaded ? { display: "none" } : {};

  const fetchMoreData = async () => {
    firebase
      .firestore()
      .collection("replies")
      .orderBy("timestampPosted", "desc")
      .startAfter(lastEntry)
      .limit(15)
      .where("commentID", "==", id)
      .get()
      .then((snapshot) => {
        setReplies(replies.concat(snapshot.docs.map((doc) => ({ id: doc.id, reply: doc.data() }))));

        setLastEntry(snapshot.docs[snapshot.docs.length - 1]);

        if (snapshot.docs.length <= 0) {
          setHasMore(false);
        }
      });
  };
  return (
    <div ref={ref} className="comment_container">
      <div className="comment">
        {!loaded && (
          <div className="rounded_profile_task_container">
            <img src={loadingImage} alt="loading" />
          </div>
        )}
        <div className="rounded_profile_task_container" style={commentLoadingStyle}>
          <IconButton aria-controls="fade-menu-liked" aria-haspopup="true">
            <img className="rounded_profile_comment" src={photoURL} onLoad={() => setLoaded(true)} alt="profile" />
          </IconButton>
          <h4 style={{ margin: 0, color: "#42c062" }}>{capitalizeFirstLetter(displayName)} &#xb7; </h4>
          <p style={{ margin: 0, marginLeft: 5, fontSize: 15, color: "#42c062" }}>{timeDiff}</p>
        </div>
        <p style={{}}>{comment.comment}</p>
        {replyOpen && (
          <div className="reply_text_area">
            <textarea className="input_reply" type="text" rows="10" cols="100" id={id} placeholder="Start typing to comment" onChange={(e) => setReply(e.target.value)}></textarea>
          </div>
        )}

        <div className="replies_button_container">
          <Button type="submit" variant="outlined" className={classes.commentButton} style={{ borderRadius: 10, backgroundColor: "#0d1117", color: "e6e6e6", height: 35, marginLeft: 10, marginBottom: 10, marginRight: 10 }} onClick={sendReply} id="reply_button">
            Reply
          </Button>
        </div>
        <div className="replies_container">
          <InfiniteScroll dataLength={replies.length} next={fetchMoreData} style={{ width: "100%" }} hasMore={hasMore} endMessage={<p style={{ textAlign: "center" }}></p>} loader={<img src={pacmanLoading} alt="loading" width="100" />}>
            {replies.map(({ id, reply }) => (
              // <div key={id}>{reply.reply}</div>
              <Reply key={id} reply={reply} id={id} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
});
const useStyles = makeStyles((theme) => ({
  commentButton: {
    fontFamily: "Consolas",
    color: "#e6e6e6",
    width: 80,
    fontSize: 12,
  },
}));
export default Comment;
