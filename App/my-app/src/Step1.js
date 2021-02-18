import React from "react";

function Step1(props) {
  return (
    <div>
     <p><input name="name" value={props.getState('name', '')} /></p>
     <p><input name="surname" value={props.getState('surname', '')} /></p>
    </div>
  );
}

export default Step1;