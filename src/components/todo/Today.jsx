import React from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

function Today(props) {
  function seperate(eachtask) {
    let todayDate = new Date().toDateString();
    let taskDate = new Date(eachtask.date).toDateString();
    return todayDate === taskDate;
  }

  function handleClick(id) {
    props.onTaskSelect(id);
  }
  return (
    <div className="card w-100">
      <div className="card-body">
        <h2 className="card-title">
          {props.taskList.length === 0 ? "No Tasks Today" : "Todays Tasks"}
        </h2>
        <ul>
          {props.taskList.filter(seperate).map((filtered) => {
            return (
              <li key={uuidv4()}>
                <Task
                  taskName={filtered.taskName}
                  isDone={filtered.isDone}
                  id={filtered.Id}
                  date={filtered.dueDate}
                  dtoggle={true}
                  onTaskSelect={handleClick}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Today;
