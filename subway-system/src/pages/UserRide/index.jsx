import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const UserRide = () => {

    return (
        <div className="page light-bg flex column">
            <div className="flex space-between">
                <div>
                    <h1>Station 1</h1>
                </div>
                <div className="flex center">
                    <FontAwesomeIcon icon={faLocationDot} className="primary-text"/>
                    <h1>Beirut</h1>
                </div>
            </div>

        </div>
    )
}

export default UserRide;