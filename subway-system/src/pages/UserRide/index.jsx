import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import UserRideCard from "./components/UserRideCard";

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
            <div className="padding">
                <h3 className="padding-bottom">List of Rides</h3>
                <div className="flex space-between padding">
                    <UserRideCard />
                    <UserRideCard />
                    <UserRideCard />
                    <UserRideCard />
                </div>
                <div className="flex space-between padding">
                    <UserRideCard />
                    <UserRideCard />
                    <UserRideCard />
                    <UserRideCard />
                </div>
            </div>

        </div>
    )
}

export default UserRide;