import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const UserProfile = () => {


    return (
        <div className="page light-bg flex column">
            <div className="flex center">
                <div className="input-container white-bg semi-rounded flex">
                    <FontAwesomeIcon icon={faMessage} className="primary-text margin-left" />
                    <input type="text" placeholder="Have anything to tell us ?" className="message-input" />
                </div>
                <div className="button-div">
                    <button>Send</button>
                </div>
                
            </div>
        </div>
    )
}

export default UserProfile;