import React from "react";
import Stats from "./Stats";

export default function Weather(props) {
  console.log(props.now);
  return (
    <div className="Weather col-6">
      <span className="temperature">
        {props.now.temp}
        <sup className="unit">℃</sup>
      </span>
      <Stats stats={props.now} />
    </div>
  );
}
