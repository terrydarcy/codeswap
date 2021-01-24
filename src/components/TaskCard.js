import React, { forwardRef, useEffect } from "react";
import "./styles/TaskCard.css";

const TaskCard = forwardRef(({ task }, ref) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div ref={ref} className="task_card">
      <div className="task_title">
        <h2 style={{ margin: 5 }}> {capitalizeFirstLetter(task.taskTitle)}</h2>
      </div>
      <div className="task_subject">
        <h3 style={{ margin: 5 }}> {capitalizeFirstLetter(task.taskSubject)}</h3>
      </div>
      <div className="task_description"> {capitalizeFirstLetter(task.taskDescription)}</div>
      <div className="task_tags"> {capitalizeFirstLetter(task.taskTags)}</div>
    </div>
  );
});

export default TaskCard;
