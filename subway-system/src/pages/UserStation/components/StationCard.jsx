import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar, faClock, faRestroom, faWheelchair, faWifi } from "@fortawesome/free-solid-svg-icons";

const StationCard = () => {
    
    return (
    <div className="station-card white-bg semi-rounded flex column gap" >
        <div className="flex space-between gap">
            <p>Station 1</p>
            <div className="flex small-gap">
                <FontAwesomeIcon icon={faLocationDot} className="primary-text"/>
                <p>Beirut</p>
            </div>
            <div className="flex">
                <FontAwesomeIcon icon={faStar} className="primary-text"/>
                <p>4</p>
            </div>
        </div>
        <div className="flex small-gap">
            <FontAwesomeIcon icon={faClock} className="primary-text"/>
            <p>3:00 am - 12:00 pm</p>
        </div>
        <div className="flex center button-div">
            <button>View Rides</button>
        </div>
        <div className="flex icons-div">
            <FontAwesomeIcon icon={faRestroom} className="primary-text" />
            <FontAwesomeIcon icon={faWheelchair} className="primary-text"/>
            <FontAwesomeIcon icon={faWifi} className="primary-text"/>
        </div>
    </div>
)}

export default StationCard;