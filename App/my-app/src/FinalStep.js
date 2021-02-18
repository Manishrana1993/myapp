// FinalStep.js
import React from "react";

function FinalStep(props) {
  return (
    <div>
  <p>Name: {props.state.name}</p>
<p>Surname: {props.state.surname}</p>
<p>Email: {props.state.email}</p>
<p>Phone: {props.state.phone}</p>
    </div>
  );
}

export default FinalStep;