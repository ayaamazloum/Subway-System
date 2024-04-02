import React from "react";
import "./style.css";
import RideCardReview from "./components/RideCardReview";

const UserProfile = () => {
    return (
        <div className="page light-bg flex column">
            <div className="button-div padding">
                <button>Request Coins</button>
            </div>
            <div>
                <h3 className="padding">Rides History</h3>
                <div className="flex gap space-between padding">
                    <RideCardReview />
                    <RideCardReview />
                    <RideCardReview />
                    <RideCardReview />
                </div>
            </div>
        </div>
    )
}

export default UserProfile;