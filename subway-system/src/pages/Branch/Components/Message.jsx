import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faL,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
import { toast } from "react-toastify";

const Message = ({ message, deleteMessage }) => {
  const [loading, setLoading] = useState(false);

  const [messageData, setMessageData] = useState({
    content: "",
    receiver_id: message.sender_id,
  });
  const convertDateFormat = (datetimeString) => {
    const dateTime = new Date(datetimeString);

    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();

    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    return formattedDay + "-" + formattedMonth + "-" + year;
  };
  const createMessage = () => {
    const response = sendRequest(
      requestMehods.POST,
      "messages",
      messageData
    ).then((response) => {
      setLoading(true);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setMessageData({
          content: "",
          receiver_id: 0,
        });
        setLoading(false);
      }
    });
  };
  return (
    <>
      {loading ? (
        <BeatLoader
          className="loader"
          color={"#35b368"}
          loading={loading}
          size={50}
        />
      ) : (
        <div className="message  bg-white rad-6 p-relative">
          <div className="p-20 between-flex">
            <div className="head">
              <h4 className="m-0 fs-18">{message.sender_name}</h4>
              <p className="fs-13 c-gray mt-5 ">
                {convertDateFormat(message.created_at)}
              </p>
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
      )}
    </>
  );
};

export default Message;
