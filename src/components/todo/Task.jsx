import React from "react";

function Task(props) {
  function handleClick(id) {
    props.onTaskSelect(id);
  }

  function handleDelete(id) {
    props.onTaskDelete(id);
  }

  return (
    <div className="row animate__animated animate__zoomInDowne">
      <div className="col-1">
        <div
          className={
            props.isDone ? "checkmark taskDone" : "checkmark taskIncomplete"
          }
          onClick={() => {
            handleClick(props.id);
          }}
        ></div>
      </div>

      <div className="col mr0">
        <label className="Task">
          {props.isDone ? <del>{props.taskName}</del> : props.taskName}
        </label>
      </div>

      <div className="col-4">
        <p className="tag">Add tag</p>
      </div>

      <div className="col-2 deleteIcon">
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
