import React from "react";

function CompletedTask(props) {
  function handleClick(id) {
    props.onTaskSelect(id);
  }

  function handleDelete(id) {
    props.onTaskDelete(id);
  }

  return (
    <div className="row">
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
        <label className="Task text-muted">{props.taskName}</label>
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

export default CompletedTask;
