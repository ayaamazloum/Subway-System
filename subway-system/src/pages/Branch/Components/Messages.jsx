import React, { useEffect, useState } from "react";
import Message from "./Message";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMessages = () => {
    const response = sendRequest(requestMehods.GET, "messages").then(
      (response) => {
        setMessages(response.data.data);
        setLoading(false);
      }
    );
  };
  useEffect(() => {
    getMessages();
  }, []);
  const handleDeleteAction = (id) => {
    const response = sendRequest(requestMehods.DELETE, `messages/${id}`).then(
      (response) => {
        setLoading(true);
        if (response.data.status === "success") {
          toast.success(response.data.message);
          setLoading(true);
          getMessages();
        }
      }
    );
  };
  return (
    <>
      <div className="content w-full">
        <h1 className="p-relative fs-30">Messages</h1>
        {loading ? (
          <BeatLoader
            className="loader"
            color={"#35b368"}
            loading={loading}
            size={50}
          />
        ) : (
          <div className="messages-page d-grid gap-20 m-20">
            {messages?.map((message) => {
              return (
                <Message
                  key={message.id}
                  message={message}
                  deleteMessage={handleDeleteAction}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
