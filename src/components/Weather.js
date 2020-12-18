import React from "react";
import Spinner from "./Spinner";

class Weather extends React.Component {
  state = {
    lat: null,
    log: null,
    errorMeassage: "",
    city: "",
    temperature: null,
    weather: "",
    isFeatched: false,
    lastUpdated: 0,
    icon: "",
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
    // let refreshID = setInterval(
    //   () => this.setState({ ...this, lastUpdated: this.state.lastUpdated + 1 }),
    //   60000
    // );
  }

  fetchData() {
    //Fetching the Weather Data.
    this.setState({ ...this.state, isFeatched: true });
    const key = "8a601adb68ef31e72c7179cf014a1025";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      this.state.lat +
      "&lon=" +
      this.state.log +
      "&appid=" +
      key +
      "&units=metric";

    fetch(url)
      .then(function (resp) {
        // console.log(resp);
        return resp.json();
      }) // Convert data to json
      .then((data) => {
        // console.log(data);
        return this.setState({
          ...this.state,
          city: data.name,
          temperature: data.main.temp,
          weather: data.weather[0].main,
          icon: data.weather[0].icon,
        });
      })
      .catch(function (err) {
        // catch any errors
        console.log(err);
        this.setState({ errorMessage: err });
      });
  }

  loadDisplay() {
    if (this.state.errorMeassage) {
      return <Spinner message="Please Accept the Location Services..." />;
    }
    if (this.state.lat && this.state.log && !this.state.errorMeassage) {
      if (!this.state.isFeatched) {
        this.fetchData();
      }
      var icon = `http://openweathermap.org/img/wn/${this.state.icon}@2x.png`;
      return (
        <div className="card text-center weather-card" style={card}>
          <div className="card-body">
            <h5 className="card-title">{this.state.city}</h5>
            <p className="card-text mb-0">{this.state.temperature}&#8451;</p>
            <img src={icon} alt="icon" />
            <p className="mb-0">{this.state.weather}</p>
          </div>
        </div>
      );
    }
    return <Spinner message="Loading.." />;
  }

  render() {
    return this.loadDisplay();
  }
}

const card = {
  width: "10rem",
};

export default Weather;
