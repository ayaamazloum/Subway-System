import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const UserRide = () => {

    return (
        <div className="page light-bg flex column">
            <div className="flex space-between">
                <div>
                    <h1>Station 1</h1>
                </div>
                <div className="flex center">
                    <FontAwesomeIcon icon={faLocationDot} className="primary-text adj-size"/>
                    <h1>Beirut</h1>
                </div>
            </div>
            <div>
                <h3>List of Rides</h3>
                <div>
                    
                </div>
            </div>

        </div>
    )
}

export default UserRide;