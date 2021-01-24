import React, { forwardRef, useEffect } from "react";
import "./styles/TaskCard.css";

const TaskCard = forwardRef(({ task }, ref) => {
  console.log(task.taskDescription);
  return (
    <div ref={ref} className="task_card">
      <div className="task_title"> {task.taskTitle}</div>
      <div className="task_subject"> {task.taskSubject}</div>
      <div className="task_description"> {task.taskDescription}</div>
      <div className="task_tags"> {task.taskTag}</div>
    </div>
  );
});

export default TaskCard;
