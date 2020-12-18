import React from "react";
import ToDo from "./components/todo/ToDoList";
import CompletedList from "./components/todo/Completed";
import Weather from "./components/Weather";
import Day from "./components/Day";
// Index CSS
import "./css/Index.css";

class App extends React.Component {
  render() {
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
            <ToDo />
          </div>
          <div className="col float-left">
            <Weather />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
