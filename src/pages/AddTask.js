import React from "react";
import "./styles/AddTask.css";
import { makeStyles, Button, IconButton } from "@material-ui/core";

function AddTask() {
  const classes = useStyles();
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
              Please be as specific as possible so developers attempting your task will be able to follow your needs.
              <br />
              <br />
              <span style={{ color: "#d9215a" }}>
                Example:
                <br />
              </span>{" "}
              <span style={{ color: "#42C062" }}>
                Write a <u>bubblesort Algorithm</u> in Java that takes a <u>Integer Array X</u> and returns a <u>sorted List XS</u> (in descending order) with <u>5 subtracted from each element in XS</u>.
              </span>
              <br />
              <br />
              Your task will be public for developers to complete!
              <br />
              <br />
              Once your task has been completed the task price will go directly to the developer.
              <br />
              <br />
              The more concise your task listing is, the higher your chance of getting a fast answer. So please take your time when posting a task!
            </p>
          </div>
        </div>
        <div className="add_job_card_container">
          <div className="add_job_card">
            <h2>Task Details</h2>
            <input className="input_login" placeholder="Task title"></input>
            <input className="input_login" placeholder="Programming language / subject"></input>

            <textarea className="input_login job_description" width="100%" type="text" rows="10" cols="80" placeholder="Task description"></textarea>
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ flex: 1 }}>
                <p>#</p>
              </div>
              <input className="input_login" style={{ flex: 10 }} placeholder="Tags seperated with spaces"></input>
            </div>
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ flex: 1 }}>
                <p>$</p>
              </div>
              <input className="input_login" style={{ flex: 10 }} placeholder="Task price for developer"></input>
            </div>
            <Button variant="outlined" className={classes.headerButton} style={{ backgroundColor: "#42C062", color: "#e6e6e6", padding: 10, margin: 10, height: 40 }}>
              Post Job
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
