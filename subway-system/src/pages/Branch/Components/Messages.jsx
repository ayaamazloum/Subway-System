import React from "react";
import Message from "./Message";
const Messages = () => {
  return (
    <>
      <div className="content w-full">
        <h1 className="p-relative fs-30">Messages</h1>
        <div className="messages-page d-grid gap-20 m-20">
          <Message />
        </div>
      </div>
    </>
  );
};

export default Messages;
