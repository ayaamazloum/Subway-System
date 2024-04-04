import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
const Review = ({ review, handleDelete }) => {
  console.log(review);
  const convertDateFormat = (datetimeString) => {
    const dateTime = new Date(datetimeString);

    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();

    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    return formattedDay + "-" + formattedMonth + "-" + year;
  };
  return (
    <>
      <div className="review  bg-white rad-6 p-relative">
        <div className="p-20 between-flex">
          <div className="head">
            <h4 className="m-0 fs-18">{review.passenger.user.name}</h4>
            <p className="fs-13 c-gray mt-5 ">
              {convertDateFormat(review.created_at)}
            </p>
          </div>
          <div className="center-flex gap-5 actions">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                handleDelete(review.id);
              }}
            />
          </div>
        </div>
        <div className="info between-flex">
          <p>{review.content}</p>
        </div>
      </div>
    </>
  );
};

export default Review;
