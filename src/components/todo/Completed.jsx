import React, { useState } from "react";
import Task from "./Task";

import { v4 as uuidv4 } from "uuid";

function Completed(props) {
  var [completedCount, setCount] = useState(0);
  function seperate(eachtask) {
    return eachtask.isDone === true;
  }
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">
          {props.taskList.length === 0
            ? "No Task Pending"
            : `Completed Task ${completedCount} / ${props.taskList.length}`}
        </h2>
        <ul>
          {props.taskList.filter(seperate).map((filtered) => {
            return (
              <li key={uuidv4()}>
                <Task
                  taskName={filtered.taskName}
                  isDone={filtered.isDone}
                  id={filtered.id}
                />
              </li>
            );
          })}
        </ul>
        {console.log("jj" + completedCount)}
      </div>
    </div>
  );
}

export default Completed;
