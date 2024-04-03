import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar, faClock, faPeopleArrows } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UserRideCard = ( {ride} ) => {
    const {rating, start_station_longitude, start_station_latitude, end_station_longitude, end_station_latitude, start_time, end_time, capacity } = ride;
    const [startLocationName, setStartLocationName] = useState('');
    const [endLocationName, setEndLocationName] = useState('');

    useEffect(() => {
        const fetchLocationName = async (latitude, longitude, setLocationName) => {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                if (response.data && response.data.address && response.data.address.village) {
                    setLocationName(response.data.address.village);
                } else {
                    setLocationName('Location not found');
                }
            } catch (error) {
                console.error(error.message);
                setLocationName('Error fetching location');
            }
        };

        fetchLocationName(start_station_latitude, start_station_longitude, setStartLocationName);
        fetchLocationName(end_station_latitude, end_station_longitude, setEndLocationName);
    }, [start_station_latitude, start_station_longitude, end_station_latitude, end_station_longitude]);

    return (
        <div className="ride-card white-bg semi-rounded flex column gap">
            <div className="flex flex-end">
                <FontAwesomeIcon icon={faStar} className="primary-text"/>
                <p>{rating}</p>
            </div>
            <div className="flex small-gap">
                <FontAwesomeIcon icon={faLocationDot} className="primary-text"/>
                <p>{startLocationName} - {endLocationName}</p>
            </div>
            <div className="flex small-gap">
                <FontAwesomeIcon icon={faClock} className="primary-text"/>
                <p>{start_time} - {end_time}</p>
            </div>
            <div className="flex small-gap">
                <FontAwesomeIcon icon={faPeopleArrows} className="primary-text" />
                <p>{capacity} Seats</p>
            </div>
            <div className="flex center button-div">
                <button>Book Ticket</button>
            </div>

        </div>
    )
}

export default UserRideCard;