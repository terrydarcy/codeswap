import React, { useContext, useState } from "react";
import "./styles/AddTask.css";
import { makeStyles, Button, IconButton } from "@material-ui/core";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router";
import firebase from "firebase";
import { capitalizeFirstLetter } from "../components/Capitalizer";

function AddTask() {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTags, setTaskTags] = useState("");

  var Filter = require("bad-words"),
    filter = new Filter();

  const parseTags = (tags) => {
    var split = "";
    if (tags.includes(",")) {
      split = tags.split(",");
      for (var i = 0; i < split.length; i++) {
        if (split[i].length <= 0) {
          split.splice(i, 1);
          split[i] = capitalizeFirstLetter(split[i]);
          continue;
        }
        split[i] = "#" + split[i];
      }
    } else {
      split = tags.split(" ");
      for (var i = 0; i < split.length; i++) {
        if (split[i].length <= 0) {
          split.splice(i, 1);
          continue;
        }
        split[i] = capitalizeFirstLetter(split[i]);
        split[i] = "#" + split[i];
      }
    }
    return split.join(" ");
  };
  const postTask = () => {
    if (user) {
      if (filter.isProfane(taskTitle) || filter.isProfane(taskSubject) || filter.isProfane(taskDescription || filter.isProfane(taskTags))) {
        document.getElementById("error_text").innerHTML = "Explicit language is not allowed.";
      } else {
        if (taskTitle.length < 5) {
          document.getElementById("error_text").innerHTML = "Task title field must be longer than 5 characters.";
        } else if (taskSubject.length < 1) {
          document.getElementById("error_text").innerHTML = "Task programming language/subject field must be longer than 1 characters.";
        } else if (taskDescription.length < 10) {
          document.getElementById("error_text").innerHTML = "Task description field must be longer than 10 characters.";
        } else if (taskTags.length < 1) {
          document.getElementById("error_text").innerHTML = "Task tags field must be longer than 1 characters.";
        } else {
          firebase
            .firestore()
            .collection("tasks")
            .add({
              taskTitle: taskTitle,
              taskSubject: taskSubject,
              taskDescription: taskDescription,
              taskTags: parseTags(taskTags),
              timestampPosted: firebase.firestore.FieldValue.serverTimestamp(),
              postedBy: user.uid,
            });
          setTaskTitle("");
          setTaskSubject("");
          setTaskDescription("");
          setTaskTags("");
          document.getElementById("taskTitle").value = "";
          document.getElementById("taskSubject").value = "";
          document.getElementById("taskDescription").value = "";
          document.getElementById("taskTags").value = "";

          document.getElementById("error_text").innerHTML = "";
          document.getElementById("success_text").innerHTML = "Task has been posted! <a href ='/' style ='color:#e6e6e6'> click here </a> to view your task.";
        }
      }
    } else {
      document.getElementById("error_text").innerHTML = "Please <a style=' color: #e6e6e6;' href='/login'>login here</a> to post comments";
    }
  };

  return (
    <div className="add_job">
      <div className="add_job_container">
        <div className="add_job_info_container">
          <div className="add_job_info">
            <h2>How it works</h2>
            <p>
              Let us know more about your task.
              <br />
              <br />
              Please be as specific as possible so developers attempting your task will be able to asses your needs clearly.
              <br />
              <br />
              <span style={{ color: "#d9215a" }}>
                Example:
                <br />
              </span>{" "}
              <span style={{ color: "#42C062" }}>
                I need a <u>bubblesort Algorithm</u> in Java that takes a <u>Integer Array X</u> and returns a <u>sorted List XS</u> (in descending order) with <u>5 subtracted from each element in XS</u>.
              </span>
              <br />
              <br />
              Your task will be public for developers to complete!
              <br />
              <br />
              The more concise your task listing is, the higher your chance of getting a fast answer. So please take your time when posting a task!
            </p>
          </div>
        </div>
        <div className="add_job_card_container">
          <div className="add_job_card">
            <h2>Task Details</h2>
            <input className="input_login" placeholder="Task title" id="taskTitle" onChange={(e) => setTaskTitle(e.target.value)}></input>
            <input className="input_login" placeholder="Programming language / subject" id="taskSubject" onChange={(e) => setTaskSubject(e.target.value)}></input>
            <textarea className="input_login job_description" width="100%" type="text" rows="10" cols="80" id="taskDescription" placeholder="Task description" onChange={(e) => setTaskDescription(e.target.value)}></textarea>
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ flex: 1 }}>
                <p>#</p>
              </div>
              <input className="input_login" id="taskTags" style={{ flex: 10 }} placeholder="Tags seperated with spaces" onChange={(e) => setTaskTags(e.target.value)}></input>
            </div>

            <div id="error_text"></div>
            <div id="success_text"></div>
            <Button variant="outlined" className={classes.headerButton} style={{ backgroundColor: "#42C062", color: "#e6e6e6", padding: 10, margin: 10, height: 40 }} onClick={() => postTask()}>
              Post Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  headerButton: {
    fontFamily: "Consolas",
    color: "#e6e6e6",
    minWidth: 70,
  },
}));
export default AddTask;
