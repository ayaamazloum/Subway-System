import { faDollarSign, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CoinRequest = () => {
  return (
    <>
      <div className="coinrequest  bg-white rad-6 p-relative">
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
        <div className="info p-20 between-flex">
          <div className="amount fs-18 d-flex gap-5 align-center">
            <FontAwesomeIcon icon={faDollarSign} />
            <span>200</span>
          </div>
          <div className="status">
            <button>Status</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinRequest;
