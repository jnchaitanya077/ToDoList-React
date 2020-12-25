import React, { useState } from "react";
import ToDo from "./components/todo/ToDoList";
import CompletedList from "./components/todo/Completed";
import TodaysList from "./components/todo/Today";
import Weather from "./components/Weather";
import Day from "./components/Day";
// Index CSS
import "./css/Index.css";

var id = 0;
function App() {
  const [list, addTask] = useState({ taskList: [] });
  const [date, setDate] = useState(formatDate(new Date().toLocaleDateString()));
  const [errMsg, setMsg] = useState("");
  const [task, addTaskName] = useState("");
  var [count, setCompletedCount] = useState(0);

  function handleChange(event) {
    var tName = event.target.value;
    addTaskName(tName);
    event.preventDefault();
  }

  function handleSubmit(event) {
    if (
      task !== "" &&
      validateDate(
        new Date(date).toLocaleDateString(),
        new Date().toLocaleDateString()
      )
    ) {
      setMsg(""); // reset the error message.
      addTask((prev) => {
        return {
          taskList: [
            ...prev.taskList,
            {
              taskName: task,
              isDone: false,
              Id: id++,
              date: date,
              dueDate: formatDueDate(date),
            },
          ],
        };
      });
    } else {
      setMsg("Enter Valid Date");
    }
    addTaskName("");
    setDate(formatDate(new Date().toLocaleDateString()));
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

  function handleDateChange(date) {
    setDate(date);
  }

  function completedCount(arr) {
    const c = arr.filter((eachTask) => eachTask.isDone === true).length;
    return c;
  }

  function formatDate(date) {
    let fDate = date.split("/");
    let nDate = `${fDate[2]}-${fDate[0]}-${fDate[1]}`;
    return nDate;
  }

  function validateDate(taskDate, presentDate) {
    taskDate = new Date(formatDate(taskDate));
    presentDate = new Date(formatDate(presentDate));
    return +taskDate >= +presentDate;
  }

  function formatDueDate(d) {
    let options = {
      month: "short",
      day: "numeric",
    };
    let date = new Date(d).toLocaleDateString("en-US", options);
    return date;
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
            date={date}
            err={errMsg}
            onTaskSelect={handleSelect}
            onTaskDelete={handleDelete}
            onTaskSubmit={handleSubmit}
            onTaskChange={handleChange}
            onDateChange={handleDateChange}
          />
        </div>

        <div className="col-12 col-md-8 col-lg-4">
          <TodaysList taskList={list.taskList} />
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
