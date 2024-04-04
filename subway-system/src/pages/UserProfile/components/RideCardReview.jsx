import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faStar,
  faClock,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../../components/PopUp";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
import { toast } from "react-toastify";

const RideCardReview = ({ ride }) => {
  console.log(ride);
  const [showPopup, setShowPopup] = useState(false);
  const [createReview, setCreateReview] = useState({
    rating: 0,
    content: "",
    ride_id: ride.id,
  });
  const openPopup = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  function convertTimeFormat(time) {
    const [hours, minutes] = time.split(":").map(Number);

    const ampm = hours >= 12 ? "PM" : "AM";

    let formattedHours = hours % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours;

    const formattedTime = `${formattedHours}:${
      minutes < 10 ? "0" : ""
    }${minutes}${ampm}`;

    return formattedTime;
  }
  const handleSubmit = () => {
    const response = sendRequest(
      requestMehods.POST,
      "view_passenger_rides",
      createReview
    ).then((respone) => {
      console.log(respone);
      if (respone.data.status === "success") {
        closePopup();
        toast.success(respone.data.message);
        setCreateReview({
          rating: 0,
          content: "",
          ride_id: 0,
        });
      }
    });
  };
  return (
    <>
      <div className="ride-card white-bg semi-rounded flex column gap">
        <div className="flex flex-end">
          <FontAwesomeIcon icon={faStar} className="primary-text" />
          <p>4</p>
        </div>
        <div className="flex small-gap">
          <FontAwesomeIcon icon={faLocationDot} className="primary-text" />
          <p>Jounieh - Beirut</p>
        </div>
        <div className="flex small-gap">
          <FontAwesomeIcon icon={faClock} className="primary-text" />
          <p>
            {convertTimeFormat(ride.start_time)} -{" "}
            {convertTimeFormat(ride.end_time)}
          </p>
        </div>
        <div className="flex small-gap">
          <FontAwesomeIcon icon={faPeopleArrows} className="primary-text" />
          <p>{ride.capacity} Seats</p>
        </div>
        <div className="flex center button-div">
          <button
            onClick={(e) => {
              e.preventDefault();
              openPopup();
            }}
          >
            Review
          </button>
        </div>
      </div>
      {showPopup && (
        <PopUp
          closePopup={closePopup}
          buttenText="Create"
          formTitle="Create Review"
          isOpen={showPopup}
          handleSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          closePopUp={closePopup}
        >
          <div>
            <label htmlFor="message">Message</label>
            <input
              type="text"
              onChange={(e) => {
                setCreateReview({
                  ...createReview,
                  content: e.target.value,
                });
              }}
              name="message"
              id="message"
            />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input
              type="text"
              placeholder="enter a rating from 0 to 5"
              name="rating"
              onChange={(e) => {
                setCreateReview({
                  ...createReview,
                  rating: e.target.value,
                });
              }}
              id="rating"
            />
          </div>
        </PopUp>
      )}
    </>
  );
};

export default RideCardReview;
