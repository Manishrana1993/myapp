import React from "react";

function Step2(props) {
  return (
    <div>
      <p><input name="email" value={props.getState('email', '')} /></p>
<p><input name="phone" value={props.getState('phone', '')} /></p>

    </div>
  );
}

export default Step2;