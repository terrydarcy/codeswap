import "./styles/TaskPage.css";
import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { useParams } from "react-router";
import { getTimeDiff } from "../components/TimeMaths";
import { capitalizeFirstLetter } from "../components/Capitalizer";
import { makeStyles, Button, IconButton } from "@material-ui/core";
import { UserContext } from "../providers/UserProvider";
import Comment from "../components/Comment";
import loadingImage from "../res/profile_post_loading.png";
import InfiniteScroll from "react-infinite-scroll-component";
import pacmanLoading from "../res/pacman.svg";
import Voting from "../components/Voting";

function TaskPage() {
  let st = useParams();
  const classes = useStyles();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTags, setTaskTags] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [timeDiff, setTimeDiff] = useState();
  const user = useContext(UserContext);
  const [commentList, setCommentList] = useState([]);

  const [lastEntry, setLastEntry] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [comment, setComment] = useState("");
  var Filter = require("bad-words"),
    filter = new Filter();

  useEffect(() => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(st.id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setTaskTitle(doc.data().taskTitle);
          setTaskSubject(doc.data().taskSubject);
          setTaskDescription(doc.data().taskDescription);
          setTaskTags(doc.data().taskTags);

          var docRef = firebase.firestore().collection("Users").doc(doc.data().postedBy);
          setTimeDiff(getTimeDiff(doc.data().timestampPosted));
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
        } else {
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    firebase
      .firestore()
      .collection("comments")
      .doc()
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setTaskTitle(doc.data().taskTitle);
          setTaskSubject(doc.data().taskSubject);
          setTaskDescription(doc.data().taskDescription);
          setTaskTags(doc.data().taskTags);
        }
      });
  }, [st.id]);

  useEffect(() => {
    var unmounted = false;
    if (!unmounted) {
      firebase
        .firestore()
        .collection("comments")
        .orderBy("timestampPosted", "desc")
        .limit(5)
        .where("taskID", "==", st.id)
        .get()
        .then((snapshot) => {
          setCommentList(snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() })));
          setLastEntry(snapshot.docs[snapshot.docs.length - 1]);
          setHasMore(true);
        });
    }
    return () => (unmounted = true);
  }, [st.id]);

  const addComment = () => {
    if (user) {
      if (comment.length <= 0) {
        document.getElementById("error").innerHTML = "Start typing to comment";
      } else if (filter.isProfane(comment)) {
        document.getElementById("error").innerHTML = "Explicit language is not allowed.";
      } else {
        document.getElementById("error").innerHTML = "";

        firebase.firestore().collection("comments").add({
          taskID: st.id,
          comment: comment,
          timestampPosted: firebase.firestore.FieldValue.serverTimestamp(),
          postedBy: user.uid,
          replies: [],
        });
        setComment("");
        document.getElementById("comment").value = "";
      }
    } else {
      document.getElementById("error").innerHTML = "Please <a style=' color: #e6e6e6;' href='/login'>login here</a> to post comments";
    }
  };

  const onKeyPress = (e) => {
    if ((e.which === 13) & e.ctrlKey) {
      document.getElementById("comment_button").click();
    }
  };

  const profileLoadingStyle = !loaded ? { display: "none" } : {};
  const fetchMoreData = async () => {
    firebase
      .firestore()
      .collection("comments")
      .orderBy("timestampPosted", "desc")
      .startAfter(lastEntry)
      .limit(10)
      .where("taskID", "==", st.id)
      .get()
      .then((snapshot) => {
        setCommentList(commentList.concat(snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() }))));

        setLastEntry(snapshot.docs[snapshot.docs.length - 1]);

        if (snapshot.docs.length <= 0) {
          setHasMore(false);
        }
      });
  };
  return (
    <div className="task">
      <div className="task_container">
        <div className="task_card_page">
          {!loaded && (
            <div className="rounded_profile_task_container">
              <img src={loadingImage} alt="loading" />
              {user && <Voting id={st.id} userID={user.uid} />}
              {!user && <Voting id={st.id} userID={null} />}
            </div>
          )}

          <div className="rounded_profile_task_container" style={profileLoadingStyle}>
            <IconButton aria-controls="fade-menu-liked" aria-haspopup="true">
              <img className="rounded_profile_task" src={photoURL} onLoad={() => setLoaded(true)} alt="profile" />
            </IconButton>
            <h3 style={{ margin: 0, color: "#348feb" }}>{capitalizeFirstLetter(displayName)} &#xb7; </h3>
            <p style={{ margin: 0, marginLeft: 5, color: "#348feb", fontSize: 13 }}>{timeDiff}</p>
            {user && <Voting id={st.id} userID={user.uid} />}
            {!user && <Voting id={st.id} userID={null} />}
          </div>
          <div className="task_info_container">
            <div className="task_title">
              <h2 style={{ margin: 5 }}> {capitalizeFirstLetter(taskTitle)}</h2>
            </div>
            <div className="task_subject">
              <h3 style={{ margin: 5 }}> {capitalizeFirstLetter(taskSubject)}</h3>
            </div>
            <div className="task_description">
              <p style={{ margin: 5 }}>{capitalizeFirstLetter(taskDescription)}</p>
            </div>
            <div className="task_tags">
              <p style={{ margin: 5, fontSize: 13 }}>{capitalizeFirstLetter(taskTags)}</p>
            </div>
            <p style={{ fontFamily: "Consolas", paddingLeft: 10, color: "#348feb" }}> Leave an answer or comment</p>

            <div className="task_buttons">
              <div style={{ paddingLeft: 10, paddingRight: 10, width: "100%" }}>
                <textarea onKeyPress={(e) => onKeyPress(e)} className="input_task" type="text" rows="10" cols="100" id="comment" placeholder="Start typing to comment" onChange={(e) => setComment(e.target.value)}></textarea>
              </div>
            </div>
            <div id="error" className="error"></div>

            <div className="comment_button_container">
              <Button type="submit" variant="outlined" className={classes.commentButton} style={{ borderRadius: 10, backgroundColor: "#0d1117", color: "e6e6e6", height: 35, marginLeft: 10, marginBottom: 10, marginRight: 10 }} id="comment_button" onClick={addComment}>
                Comment
              </Button>
              <p style={{ margin: 0, paddingTop: 10, color: "#348feb", fontSize: 13 }} className="ctrlEnterPopup">
                CTRL + ENTER to post
              </p>
            </div>
          </div>
          <br />
          <br />

          <div className="comment_container">
            <InfiniteScroll dataLength={commentList.length} next={fetchMoreData} style={{ width: "100%" }} hasMore={hasMore} endMessage={<p style={{ textAlign: "center" }}>You've reached the end of the comment stack!</p>} loader={<img src={pacmanLoading} alt="loading" width="100" />}>
              <h3>
                Comments <small>(sorted by time posted)</small>
              </h3>
              {commentList.map(({ id, comment }) => (
                <Comment key={id} comment={comment} id={id} />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  commentButton: {
    fontFamily: "Consolas",
    color: "#e6e6e6",
    width: 80,
    fontSize: 12,
  },
}));

export default TaskPage;
