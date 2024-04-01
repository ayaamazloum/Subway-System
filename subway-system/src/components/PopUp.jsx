import React, { useState } from "react";
import "../styles/popup.css";
const PopUp = ({
  children,
  handleSubmit,
  buttenText,
  formTitle,
  isOpen,
  closePopUp,
}) => {
  return (
    <div>
      {isOpen && (
        <div className="popup">
          <div className="popup-inner">
            <div>
              <h2>{formTitle}</h2>
              <span onClick={closePopUp}>&times;</span>
            </div>
            <form onSubmit={handleSubmit}>
              {children}
              <button type="submit">{buttenText}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
