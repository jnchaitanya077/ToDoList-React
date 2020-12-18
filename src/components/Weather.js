import React from "react";

function Weather(props) {
  return (
    <div className="card w-100">
      <div className="card-body">
        <h2 className="card-title">Weather</h2>
        <div className="row">{console.log(props.data)}</div>
      </div>
    </div>
  );
}

export default Weather;
