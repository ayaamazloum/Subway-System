import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import UserRideCard from "./components/UserRideCard";
import { useLocation } from "react-router-dom";

import "./style.css";

const UserRide = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const stationName = searchParams.get("stationName");
    const locationName = searchParams.get("locationName");
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/view_station_rides/1");
                if (!response.ok) {
                    throw new Error("failed to fetch rides");
                }
                const data = await response.json();
                setRides(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="page light-bg flex column">
            <div className="flex space-between">
                <div>
                    <h1>{stationName}</h1>
                </div>
                <div className="flex center">
                    <FontAwesomeIcon icon={faLocationDot} className="primary-text adj-size"/>
                    <h1>{locationName}</h1>
                </div>
            </div>
            <div className="padding">
                <h3 className="padding-bottom">List of Rides</h3>
                <div className="flex space-between padding">
                    {rides.map((ride, index) => (
                        <UserRideCard key={index} ride={ride} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default UserRide;