import {
  faLocationDot,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Manager = () => {
  return (
    <>
      <div className="manager  bg-white rad-6 p-relative">
        <div className="p-20 between-flex">
          <div className="head">
            <h4 className="m-0 fs-18">Name</h4>
            <p className="fs-13 c-gray mt-5 ">name@gmail.com</p>
          </div>
          <div className="center-flex gap-5 actions">
            <FontAwesomeIcon className="delete" icon={faTrashCan} />
            <FontAwesomeIcon className="edit" icon={faPenToSquare} />
          </div>
        </div>
        <div className="info">
          <p className="d-flex gap-5 align-center">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Location</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Manager;
