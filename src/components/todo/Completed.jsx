import React from "react";
import Task from "./CompletedTask";
import { v4 as uuidv4 } from "uuid";

function Completed(props) {
  function seperate(eachtask) {
    return eachtask.isDone === true;
  }

  function handleSelect(id) {
    props.onTaskSelect(id);
  }

  function handleDelete(id) {
    props.onTaskDelete(id);
  }

  return (
    <div className="card w-100 mt-3">
      <div className="card-body">
        <h2 className="card-title">
          {props.taskList.length === 0
            ? "No Task Pending"
            : `Completed Task ${props.completedCount} / ${props.taskList.length}`}
        </h2>
        <ul>
          {props.taskList.filter(seperate).map((filtered) => {
            return (
              <li key={uuidv4()}>
                <Task
                  taskName={filtered.taskName}
                  isDone={filtered.isDone}
                  id={filtered.Id}
                  onTaskSelect={handleSelect}
                  onTaskDelete={handleDelete}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Completed;
