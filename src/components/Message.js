import React from "react";

function Message(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.message}</p>
      <button onClick={props.onClick}>Click Me</button>
    </div>
  );
}
export default Message;