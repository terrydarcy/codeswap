import React, { forwardRef, useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import "./styles/TaskCard.css";
import HeaderProfileWidget from "./HeaderProfileWidget";
import firebase from "firebase";

const TaskCard = forwardRef(({ task }, ref) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    console.log(task.postedBy);
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

  //TODO: add testing to catch edge cases
  const getTimeDiff = (time0) => {
    const time1 = new Date().getTime() / 1000;
    var secsTimeDiff = time1 - time0.seconds,
      minsTimeDiff,
      hoursTimeDiff,
      daysTimeDiff,
      prevNum,
      ret,
      isHours = false;
    if (Math.floor(secsTimeDiff) == 1) {
      ret = String(Math.floor(secsTimeDiff)) + " second ago";
    } else {
      ret = String(Math.floor(secsTimeDiff)) + " seconds ago";
    }

    if (secsTimeDiff > 60) {
      prevNum = Math.floor((minsTimeDiff = secsTimeDiff / 60));
      console.log(Math.floor((minsTimeDiff = secsTimeDiff / 60)));
      if (prevNum == 1) {
        ret = String(Math.floor((minsTimeDiff = secsTimeDiff / 60))) + " min ago";
      } else {
        ret = String(Math.floor((minsTimeDiff = secsTimeDiff / 60))) + " mins ago";
      }
    }
    if (prevNum > 60) {
      prevNum = Math.floor((hoursTimeDiff = minsTimeDiff / 60));
      isHours = true;
      if (prevNum == 1) {
        ret = String(Math.floor((hoursTimeDiff = minsTimeDiff / 60))) + " hour ago";
      } else {
        ret = String(Math.floor((hoursTimeDiff = minsTimeDiff / 60))) + " hours ago";
      }
    } else if (isHours && prevNum > 24) {
      prevNum = Math.floor((daysTimeDiff = hoursTimeDiff / 60));
      if (prevNum == 1) {
        ret = String(Math.floor((daysTimeDiff = hoursTimeDiff / 60))) + " day ago";
      } else {
        ret = String(Math.floor((daysTimeDiff = hoursTimeDiff / 60))) + " days ago";
      }
    }
    console.log(ret);
    return ret;
  };

  return (
    <div ref={ref} className="task_card">
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
    </div>
  );
});

export default TaskCard;
