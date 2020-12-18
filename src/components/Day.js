import React from "react";

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      month: "",
      day: "",
      year: null,
    };
  }

  componentDidMount() {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var date = new Date().getDate();
    var day = days[new Date().getDay()];
    var month = months[new Date().getMonth()];
    var year = new Date().getFullYear();
    this.setState({
      date: date,
      day: day,
      month: month,
      year: year,
    });
  }
  render() {
    return (
      <div>
        {" "}
        <h1>{`${this.state.day} ${this.state.date}, ${this.state.month}\n ${this.state.year}`}</h1>
      </div>
    );
  }
}

export default Day;
