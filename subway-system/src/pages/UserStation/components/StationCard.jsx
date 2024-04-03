import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar, faClock, faRestroom, faWheelchair, faWifi } from "@fortawesome/free-solid-svg-icons";

const StationCard = ( {station} ) => {
    
    const [locationName, setLocationName] = useState('');

    useEffect(() => {
        handleConvert();
    }, []);
    
    const handleConvert = async () => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${station.latitude}&lon=${station.longitude}&format=json`);
            if (response.data.display_name) {
                setLocationName(response.data.display_name);
            } else {
                setLocationName('Location not found');
            }
            console.log(locationName);
        } catch (error) {
            console.error('Error fetching location:', error);
            setLocationName('Error fetching location');
        }
    }
    return (
    <div className="station-card white-bg semi-rounded flex column gap" >
        <div className="flex space-between gap">
            <p>{station.name}</p>
            <div className="flex small-gap">
                <FontAwesomeIcon icon={faLocationDot} className="primary-text"/>
                <p>{locationName}</p>
            </div>
            <div className="flex">
                <p>{station.average_rating}</p>
                <FontAwesomeIcon icon={faStar} className="primary-text"/>
            </div>
        </div>
        <div className="flex small-gap">
            <FontAwesomeIcon icon={faClock} className="primary-text"/>
            <p>{station.operating_hours}</p>
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