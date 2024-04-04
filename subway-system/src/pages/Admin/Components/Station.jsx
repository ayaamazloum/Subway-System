import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const Station = ({ station, openPopup, deleteStation }) => {
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
              className="edit"
              icon={faPenToSquare}
              onClick={(e) => {
                e.preventDefault();
                openPopup(station);
              }}
            />
            <FontAwesomeIcon
              className="delete"
              icon={faTrashCan}
              onClick={(e) => {
                e.preventDefault();
                deleteStation(station.id);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Station;
