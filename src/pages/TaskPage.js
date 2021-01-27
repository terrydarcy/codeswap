import "./styles/TaskPage.css";
import React, { useState, useContext, useEffect, forwardRef } from "react";
import firebase from "firebase";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getTimeDiff } from "../components/TimeMaths";
import { capitalizeFirstLetter } from "../components/Capitalizer";
import { makeStyles, Button, IconButton } from "@material-ui/core";
import { UserContext } from "../providers/UserProvider";
import Comment from "../components/Comment";
import loadingImage from "../res/profile_post_loading.png";

const TaskPage = forwardRef(({}, ref) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();
  let st = useParams();
  const classes = useStyles();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTags, setTaskTags] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [timeDiff, setTimeDiff] = useState();
  const user = useContext(UserContext);
  const [commentList, setCommentList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [comment, setComment] = useState("");
  var Filter = require("bad-words"),
    filter = new Filter();

  useEffect(() => {
    var docRef = firebase.firestore().collection("tasks").doc(st.id);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setTaskTitle(doc.data().taskTitle);
          setTaskSubject(doc.data().taskSubject);
          setTaskDescription(doc.data().taskDescription);
          setTaskTags(doc.data().taskTags);
          setPostedBy(doc.data().postedBy);

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
              console.log("Error getting doc2312312312ument:", error);
            });
        } else {
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    var docRef = firebase.firestore().collection("comments").doc();
    docRef.get().then(function (doc) {
      if (doc.exists) {
        setTaskTitle(doc.data().taskTitle);
        setTaskSubject(doc.data().taskSubject);
        setTaskDescription(doc.data().taskDescription);
        setTaskTags(doc.data().taskTags);
        setPostedBy(doc.data().postedBy);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("comments")
      .orderBy("timestampPosted", "desc")
      .where("taskID", "==", st.id)
      .onSnapshot((snapshot) => {
        setCommentList(snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() })));
      });
  }, []);

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

  return (
    <div ref={ref} className="task">
      <div className="task_container">
        <div className="task_card_page">
          {!loaded && (
            <div className="rounded_profile_task_container">
              <img className="" src={loadingImage} />
            </div>
          )}
          <div className="rounded_profile_task_container" style={profileLoadingStyle}>
            <IconButton aria-controls="fade-menu-liked" aria-haspopup="true">
              <img className="rounded_profile_task" src={photoURL} onLoad={() => setLoaded(true)} />
            </IconButton>
            <h3 style={{ margin: 0, color: "#348feb" }}>{capitalizeFirstLetter(displayName)} &#xb7; </h3>
            <p style={{ margin: 0, marginLeft: 5, color: "#348feb" }}>{timeDiff}</p>
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
              <textarea onKeyPress={(e) => onKeyPress(e)} className="input_task" type="text" rows="10" cols="80" id="comment" placeholder="Start typing to comment" onChange={(e) => setComment(e.target.value)}></textarea>
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
          <h3>
            Comments <small>(sorted by time posted)</small>
          </h3>

          <div className="comment_container">
            {commentList.map(({ comment, id }) => (
              <Comment key={id} comment={comment} />
            ))}
          </div>
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
export default TaskPage;
