import React, { useState } from "react";
import ToDo from "./components/todo/ToDoList";
import CompletedList from "./components/todo/Completed";
import Weather from "./components/Weather";
import Day from "./components/Day";
// Index CSS
import "./css/Index.css";

var id = 0;
function App() {
  const [list, addTask] = useState({ taskList: [] });
  const [task, addTaskName] = useState("");
  var [count, setCompletedCount] = useState(0);

  function handleChange(event) {
    var tName = event.target.value;
    addTaskName(tName);
    event.preventDefault();
  }

  function handleSubmit(event) {
    if (task.taskName !== "") {
      addTask((prev) => {
        return {
          taskList: [
            ...prev.taskList,
            {
              taskName: task,
              isDone: false,
              Id: id++,
              date: new Date().toDateString(),
            },
          ],
        };
      });
    }
    addTaskName("");
    event.preventDefault();
  }

  function handleSelect(id) {
    // find the index of the object selected
    let i = list.taskList.findIndex((x) => x.Id === id);
    //   create new copy of taskList array
    let updatedArray = list.taskList.slice();
    // update the task status with id
    updatedArray[i] = {
      ...updatedArray[i],
      isDone: !updatedArray[i].isDone,
    };
    //set the state with updated taskList
    addTask({ taskList: updatedArray });
    //updated the Completed Task Count
    setCompletedCount(completedCount(updatedArray));
  }

  function handleDelete(id) {
    let i = list.taskList.findIndex((x) => x.Id === id);
    let newArray = list.taskList.slice();
    newArray.splice(i, 1);
    addTask({ taskList: newArray });
    id--;
    //updated the Completed Task Count
    setCompletedCount(completedCount(newArray));
  }

  function completedCount(arr) {
    const c = arr.filter((eachTask) => eachTask.isDone === true).length;
    return c;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6">
          <h1>ToDo List</h1>
        </div>
        <div className="col col-md-6">
          <Day />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-8 col-lg-4">
          <ToDo
            taskList={list.taskList}
            taskName={task}
            onTaskSelect={handleSelect}
            onTaskDelete={handleDelete}
            onTaskSubmit={handleSubmit}
            onTaskChange={handleChange}
          />
        </div>

        <div className="col-12 col-md-8 col-lg-4">
          <CompletedList
            taskList={list.taskList}
            completedCount={count}
            onTaskSelect={handleSelect}
            onTaskDelete={handleDelete}
          />
        </div>

        <div className="col float-left">
          <Weather />
        </div>
      </div>
    </div>
  );
}

export default App;
