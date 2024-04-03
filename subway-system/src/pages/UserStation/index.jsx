import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import StationCard from "./components/StationCard"

const UserStation = () => {

    const [nearestStations, setNearestStations] = useState([]);
    const [highestRatingStations, setHighestRatingStations] = useState([]);
    const [allStations, setAllStations] = useState([]);

    useEffect(() => {
        fetchNearestStations();
        fetchHighestRatingStations();
        fetchAllStations();
    }, []);

    const fetchNearestStations = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/view_nearest_stations?passenger_id=1");
            const data = await response.json();
            setNearestStations(data.data);

        } catch (error) {
            console.error(error);
        }
    };

    const fetchHighestRatingStations = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/view_highest_rating_stations");
            const data = await response.json();
            setHighestRatingStations(data.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page light-bg flex column">
            <div className="input-container white-bg">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input type="text" placeholder="Beirut" className="search-input"/>
            </div>
            <div className="padding">
                <h2 className="padding-bottom">Nearest Stations</h2>
                <div className="flex space-between">
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                </div>
                
            </div>
            <div className="padding">
                <h2 className="padding-bottom">Highest Rating Stations</h2>
                <div className="flex space-between">
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                </div>
            </div>
            <div className="padding">
                <h2 className="padding-bottom">All Stations</h2>
                <div className="flex space-between">
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                </div>
            </div>
        </div>
    )
}

export default UserStation;