import React, { useState } from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

var id = 0;

function ToDo() {
  const [list, addTask] = useState({ taskList: [] });
  const [task, addTaskName] = useState({
    Id: 0,
    taskName: "",
    isDone: false,
    date: "",
  });

  function handleChange(event) {
    var tName = event.target.value;
    addTaskName((prev) => {
      return {
        ...prev,
        taskName: tName,
      };
    });
    event.preventDefault();
  }

  function handleSubmit(event) {
    if (task.taskName !== "") {
      addTask((prev) => {
        console.log(id);
        return {
          taskList: [
            ...prev.taskList,
            { ...task, Id: id++, date: new Date().toDateString() },
          ],
        };
      });
    }
    event.preventDefault();
  }

  function handleSelect(id) {
    // find the index of the object selected
    var i = list.taskList.findIndex((x) => x.Id === id);
    //   create new copy of taskList array
    let updatedArray = list.taskList.slice();
    // update the task status with id
    updatedArray[i] = {
      ...updatedArray[i],
      isDone: !updatedArray[i].isDone,
    };
    //set the state with updated taskList
    addTask({ taskList: updatedArray });
  }

  function handleDelete(id) {
    let i = list.taskList.findIndex((x) => x.Id === id);
    let newArray = list.taskList.slice();
    newArray.splice(i, 1);
    addTask({ taskList: newArray });
    id--;
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
              value={task.taskName}
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
            {list.taskList.map((eachTask) => {
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
