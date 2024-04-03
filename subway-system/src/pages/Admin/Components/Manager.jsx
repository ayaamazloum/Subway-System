import {
  faLocationDot,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Manager = ({ branch, deleteBranch, openPopup }) => {
  return (
    <>
      <div className="manager  bg-white rad-6 p-relative">
        <div className="p-20 between-flex">
          <div className="head">
            <h4 className="m-0 fs-18">{branch.user.name}</h4>
            <p className="fs-13 c-gray mt-5 ">{branch.user.email}</p>
          </div>
          <div className="center-flex gap-5 actions">
            <button
              className={branch.status === "active" ? "active" : "closed"}
            >
              {branch.status}
            </button>
            <FontAwesomeIcon
              className="delete"
              icon={faTrashCan}
              onClick={(e) => {
                e.preventDefault();
                deleteBranch(branch.id);
              }}
            />
            <FontAwesomeIcon
              className="edit"
              icon={faPenToSquare}
              onClick={(e) => {
                e.preventDefault();
                openPopup(branch);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
