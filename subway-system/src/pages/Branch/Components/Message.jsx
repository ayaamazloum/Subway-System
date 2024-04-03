import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
import { toast } from "react-toastify";

const Message = ({ message, deleteMessage }) => {
  const [messageData, setMessageData] = useState({
    content: "",
    receiver_id: message.sender_id,
  });
  const createMessage = () => {
    const response = sendRequest(
      requestMehods.POST,
      "messages",
      messageData
    ).then((response) => {
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setMessageData({
          content: "",
          receiver_id: 0,
        });
      }
    });
  };
  return (
    <>
      <div className="message  bg-white rad-6 p-relative">
        <div className="p-20 between-flex">
          <div className="head">
            <h4 className="m-0 fs-18">{message.sender_name}</h4>
            <p className="fs-13 c-gray mt-5 ">12-02-2024</p>
          </div>
          <div className="center-flex gap-5 actions">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={(e) => {
                e.preventDefault();
                deleteMessage(message.id);
              }}
            />
          </div>
        </div>
        <div className="info between-flex">
          <p>{message.content}</p>
        </div>
        <div className="reply">
          <input
            type="text"
            onChange={(e) => {
              setMessageData({ ...messageData, content: e.target.value });
            }}
            placeholder="enter message"
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            onClick={(e) => {
              e.preventDefault();
              createMessage();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Message;
