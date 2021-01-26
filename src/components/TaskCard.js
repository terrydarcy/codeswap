import React, { forwardRef, useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import "./styles/TaskCard.css";
import HeaderProfileWidget from "./HeaderProfileWidget";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { getTimeDiff } from "./TimeMaths";
import { capitalizeFirstLetter } from "./Capitalizer";
import { useHistory } from "react-router";

const TaskCard = forwardRef(({ task, id }, ref) => {
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [timeDiff, setTimeDiff] = useState("");
  let history = useHistory();

  useEffect(() => {
    var docRef = firebase.firestore().collection("Users").doc(task.postedBy);
    setTimeDiff(getTimeDiff(task.timestampPosted));
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
  }, []);

  return (
    <div ref={ref} className="task_card">
      <Link to={"/task/" + id} style={{ textDecoration: "none", color: "#e6e6e6", width: "100%" }}>
        <div className="rounded_profile_task_container">
          <IconButton aria-controls="fade-menu-liked" aria-haspopup="true">
            <img className="rounded_profile_task" src={photoURL} />
          </IconButton>
          <h3 style={{ margin: 0 }}>{capitalizeFirstLetter(displayName)} &#xb7; </h3>
          <p style={{ margin: 0, marginLeft: 5 }}>{timeDiff}</p>
        </div>
        <div className="task_info_container">
          <div className="task_title">
            <h2 style={{ margin: 5 }}> {capitalizeFirstLetter(task.taskTitle)}</h2>
          </div>
          <div className="task_subject">
            <h3 style={{ margin: 5 }}> {capitalizeFirstLetter(task.taskSubject)}</h3>
          </div>
          <div className="task_description">
            <p style={{ margin: 5 }}> {capitalizeFirstLetter(task.taskDescription)}</p>
          </div>
          <div className="task_tags">
            <p style={{ margin: 5 }}> {capitalizeFirstLetter(task.taskTags)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
});

export default TaskCard;
