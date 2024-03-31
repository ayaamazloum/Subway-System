import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Manager from "./Manager";
const Managers = () => {
  return (
    <div className="content w-full">
      <div className="title d-flex gap-50 align-center">
        <h1 className="fs-30">Managers</h1>
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="managers-page d-grid gap-20 m-20">
        <Manager />
      </div>
    </div>
  );
};

export default Managers;
