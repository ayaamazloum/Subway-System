import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const Message = () => {
  return (
    <>
      <div className="message  bg-white rad-6 p-relative">
        <div className="p-20 between-flex">
          <div className="head">
            <h4 className="m-0 fs-18">Name</h4>
            <p className="fs-13 c-gray mt-5 ">12-02-2024</p>
          </div>
          <div className="center-flex gap-5 actions">
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </div>
        <div className="info between-flex">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            deleniti ut harum laborum asperiores expedita officia. Eius enim
            culpa, corporis iste eligendi ducimus odit accusamus inventore
            voluptas iure alias distinctio?
          </p>
        </div>
        <div className="reply">
          <input type="text" placeholder="enter message" />
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </>
  );
};

export default Message;
