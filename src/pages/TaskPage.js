import "./styles/TaskPage.css";
import React, { useState, useEffect, forwardRef } from "react";
import firebase from "../config/fire";
import IconButton from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTimeDiff } from "../components/TimeMaths";
import { capitalizeFirstLetter } from "../components/Capitalizer";

const TaskPage = forwardRef(({ task, id }, ref) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // let history = useHistory();
  // const dispatch = useDispatch();
  // let st = useParams();

  // const [taskTitle, setTaskTitle] = useState("");
  // const [taskSubject, setTaskSubject] = useState("");
  // const [taskDescription, setTaskDescription] = useState("");
  // const [taskTags, setTaskTags] = useState("");
  // const [taskTimestamp, setTaskTimestamp] = useState("");
  // const [postedBy, setPostedBy] = useState("");
  // const [photoURL, setPhotoURL] = useState("");
  // const [displayName, setDisplayName] = useState("");
  // const [timeDiff, setTimeDiff] = useState("");

  // useEffect(() => {
  //   var docRef = firebase.firestore().collection("tasks").doc(st.id);
  //   docRef
  //     .get()
  //     .then(function (doc) {
  //       if (doc.exists) {
  //         setTaskTitle(doc.data().taskTitle);
  //         setTaskSubject(doc.data().taskSubject);
  //         setTaskDescription(doc.data().taskDescription);
  //         setTaskTags(doc.data().taskTags);
  //         setPostedBy(doc.data().postedBy);
  //         setTaskTimestamp(doc.data().timestampPosted);
  //       } else {
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("Error getting document:", error);
  //     });
  // }, []);
  // useEffect(() => {
  //   console.log(postedBy);
  //   var docRef = firebase.firestore().collection("Users").doc(postedBy);
  //   setTimeDiff(getTimeDiff(taskTimestamp));
  //   docRef
  //     .get()
  //     .then(function (doc) {
  //       if (doc.exists) {
  //         setPhotoURL(doc.data().photoURL);
  //         setDisplayName(doc.data().displayName);
  //       } else {
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("Error getting document:", error);
  //     });
  // }, []);

  return (
    <div ref={ref} className="task">
      <div className="task_card_page">
        {/*
        <div className="rounded_profile_task_container">
          <IconButton aria-controls="fade-menu-liked" aria-haspopup="true">
            <img className="rounded_profile_task" src={photoURL} />
          </IconButton>
           <h3 style={{ margin: 0 }}>{capitalizeFirstLetter(displayName)} &#xb7; </h3>
          <p style={{ margin: 0, marginLeft: 5 }}>{timeDiff}</p>
        </div>
        <div className="task_info_container">
          <div className="task_title">
            <h2 style={{ margin: 5 }}> {capitalizeFirstLetter(taskTitle)}</h2>
          </div>
          <div className="task_subject">
            <h3 style={{ margin: 5 }}> {capitalizeFirstLetter(taskSubject)}</h3>
          </div>
          <div className="task_description">
            <p style={{ margin: 5 }}> {capitalizeFirstLetter(taskDescription)}</p>
          </div>
          <div className="task_tags">
            <p style={{ margin: 5 }}> {capitalizeFirstLetter(taskTags)}</p>
          </div>
        </div>
           */}
      </div>
    </div>
  );
});

export default TaskPage;
