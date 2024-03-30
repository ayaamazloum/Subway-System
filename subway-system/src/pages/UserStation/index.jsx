import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const UserStation = () => {

    return (
        <div className="page light-bg flex column">
            <div className="input-container">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input type="text" placeholder="Beirut" className="search-input"/>
            </div>
            <div>
                <h2>Nearest Stations</h2>
            </div>
            <div>
                <h2>Highest Rating Stations</h2>
            </div>
            <div>
                <h2>All Stations</h2>
            </div>
        </div>
    )
}

export default UserStation;