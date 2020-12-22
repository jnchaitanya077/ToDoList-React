import React, { useState } from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

function ToDo(props) {
  function handleChange(event) {
    props.onTaskChange(event);
    event.preventDefault();
  }

  function handleSubmit(event) {
    props.onTaskSubmit(event);
    event.preventDefault();
  }

  function handleSelect(id) {
    props.onTaskSelect(id);
  }

  function handleDelete(id) {
    props.onTaskDelete(id);
  }

  return (
    <div className="card w-100">
      <div className="card-body">
        <h2 className="card-title">List</h2>
        <div className="row">
          <div className="col-10">
            <input
              className="inputText"
              placeholder="Enter Your Task"
              type="text"
              name="taskName"
              value={props.taskName}
              onChange={handleChange}
            />
          </div>

          <div className="col-2">
            {" "}
            <ion-icon
              className="addTask"
              name="add-circle-outline"
              onClick={handleSubmit}
            ></ion-icon>
          </div>
        </div>

        <div style={taskListItems}>
          <ul>
            {props.taskList.map((eachTask) => {
              return (
                <li key={uuidv4()}>
                  {" "}
                  <Task
                    taskName={eachTask.taskName}
                    isDone={eachTask.isDone}
                    id={eachTask.Id}
                    onTaskSelect={handleSelect}
                    onTaskDelete={handleDelete}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

const taskListItems = {
  marginTop: "20px",
};

export default ToDo;
