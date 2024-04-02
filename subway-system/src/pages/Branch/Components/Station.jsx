import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const Station = ({ station, openPopup }) => {
  return (
    <>
      <div className="station bg-white rad-6 p-relative">
        <div className="p-20 between-flex">
          <h4 className="m-0 fs-18">{station.name}</h4>
          <div className="center-flex gap-5 actions">
            <button
              className={
                station.service_status === "active" ? "active" : "closed"
              }
            >
              {station.service_status}
            </button>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => openPopup(station)}
            />
          </div>
        </div>
        <div className="info between-flex">
          <div>
            <ul className="ul-list m-0 list-none">
              <li className="mt-25 d-flex align-center done">
                {station.operating_hours}
              </li>
            </ul>
          </div>
          <div className="location">
            <FontAwesomeIcon icon={faLocationDot} />
            Location
          </div>
        </div>
      </div>
    </>
  );
};

export default Station;
