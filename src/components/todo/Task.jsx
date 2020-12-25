import React from "react";

function Task(props) {
  function handleClick(id) {
    props.onTaskSelect(id);
  }

  function handleDelete(id) {
    props.onTaskDelete(id);
  }

  return (
    <div className={props.isDone ? "row taskCompleted" : "row m-2"}>
      <div
        className={
          props.isDone ? " checkmark taskDone" : " checkmark taskIncomplete"
        }
        onClick={() => {
          handleClick(props.id);
        }}
      ></div>
      <div className="col-4 pl-0">
        <label className="Task">{props.taskName}</label>
      </div>

      <div className="col-4 dueDate">
        {/* <p className="tag">Add tag</p> */}
        <ion-icon name="calendar-outline"></ion-icon>
        <span className="dueSubText">{props.date}</span>
      </div>

      <div
        className={props.dtoggle ? "col-3 taskCompleted" : "col-2 deleteIcon "}
      >
        <ion-icon
          name="trash-outline"
          onClick={() => {
            handleDelete(props.id);
          }}
        ></ion-icon>
      </div>
    </div>
  );
}

export default Task;
