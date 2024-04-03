import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
const Ride = ({ Ride, openPopup }) => {
  function convertToAMPM(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);

    const period = hours >= 12 ? "PM" : "AM";

    const hours12 = hours % 12 || 12;

    return `${hours12}:${minutes < 10 ? "0" : ""}${minutes}${period}`;
  }
  return (
    <div className="ride  bg-white rad-6 p-relative">
      <div className="p-20 between-flex">
        <h4 className="m-0 fs-18">{Ride.id}</h4>
        <div className="center-flex gap-5 actions">
          <button
            className={
              Ride.status === "ongoing"
                ? "active"
                : Ride.status === "delayed"
                ? "delayed"
                : "closed"
            }
          >
            {Ride.status}
          </button>
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => {
              openPopup(Ride);
            }}
          />
        </div>
      </div>
      <div className="info between-flex">
        <div>
          <ul className=" ul-list m-0  list-none">
            <li className="mt-25 d-flex align-center done">
              {convertToAMPM(Ride.start_time)} - {convertToAMPM(Ride.end_time)}
            </li>
          </ul>
        </div>
        <div className="location">
          <FontAwesomeIcon icon={faLocationDot} />
          location
        </div>
      </div>
    </div>
  );
};

export default Ride;
