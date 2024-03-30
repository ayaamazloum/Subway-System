import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
const Ride = () => {
  return (
    <div className="ride  bg-white rad-6 p-relative">
      <div className="p-20 between-flex">
        <h4 className="m-0 fs-18">ID</h4>
        <div className="center-flex gap-5 actions">
          <button>Status</button>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
      </div>
      <div className="info between-flex">
        <div>
          <ul className=" ul-list m-0  list-none">
            <li className="mt-25 d-flex align-center done">
              open hours - open hours
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
