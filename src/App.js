import React from "react";
import ToDo from "./components/todo/ToDoList";
import CompletedList from "./components/todo/Completed";
import Weather from "./components/Weather";
import Day from "./components/Day";
// Index CSS
import "./css/Index.css";

class App extends React.Component {
  state = {
    lat: null,
    log: null,
    errorMeassage: "",
    city: "",
    temperature: null,
    weather: "",
    isFeatched: false,
    lastUpdated: 0,
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (l) =>
        this.setState({
          ...this.state,
          lat: l.coords.latitude,
          log: l.coords.longitude,
        }),
      (err) => this.setState({ errorMeassage: err.message })
    );

    // update weather for every 30min
    setInterval(() => {
      this.fetchData();
      this.setState({ ...this, lastUpdated: 0 });
    }, 1800000);

    // updated last updated time
    let refreshID = setInterval(
      () => this.setState({ ...this, lastUpdated: this.state.lastUpdated + 1 }),
      60000
    );
  }

  fetchData() {
    this.setState({ ...this, isFeatched: true });
    const key = "960f53977e6258607233244156ea3388";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      this.state.lat +
      "&lon=" +
      this.state.log +
      "&appid=" +
      key +
      "&units=metric";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return this.setState({
          ...this.state,
          city: data.name,
          temperature: data.main.temp,
          weather: data.weather[0].main,
        });
      })
      .catch((err) => this.setState({ errorMeassage: err }));
  }
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
          <div className="col col-md-4">
            <ToDo />
          </div>
          <div className="col col-md-4">
            <Weather data={this.state} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
