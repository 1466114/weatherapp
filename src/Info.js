import React from "react";
import City from "./City";
import Time from "./Time";
export default function Info(props) {
  return (
    <div className="Info col-6">
      <City city={props.city} />
      <Time updateTime={props.updateTime} />
    </div>
  );
}
