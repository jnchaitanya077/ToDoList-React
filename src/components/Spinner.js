import React from "react";

function Spinner(props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default Spinner;
