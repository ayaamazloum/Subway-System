import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar, faClock, faPeopleArrows } from "@fortawesome/free-solid-svg-icons";

const UserRideCard = () => {

    return (
        <div className="ride-card white-bg semi-rounded flex column gap">
            <div className="flex flex-end">
                <FontAwesomeIcon icon={faStar} className="primary-text"/>
                <p>4</p>
            </div>
            <div className="flex small-gap">
                <FontAwesomeIcon icon={faLocationDot} className="primary-text"/>
                <p>Jounieh - Beirut</p>
            </div>
            <div className="flex small-gap">
                <FontAwesomeIcon icon={faClock} className="primary-text"/>
                <p>10 am - 11:00 am</p>
            </div>
            <div className="flex small-gap">
                <FontAwesomeIcon icon={faPeopleArrows} className="primary-text" />
                <p>40 Seats</p>
            </div>
            <div className="flex center button-div">
                <button>Book Ticket</button>
            </div>

        </div>
    )
}

export default UserRideCard;