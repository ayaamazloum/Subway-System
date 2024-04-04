import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar, faClock, faPeopleArrows } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UserRideCard = ( {ride} ) => {
    const {ride_id, rating, start_station_longitude, start_station_latitude, end_station_longitude, end_station_latitude, start_time, end_time, capacity } = ride;
    const [startLocationName, setStartLocationName] = useState('');
    const [endLocationName, setEndLocationName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [ticketType, setTicketType] = useState('')

    console.log(ride.end_station_latitude);

    const fetchLocationName = async (latitude, longitude, loc) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            console.log(response.data.address.city);
            if (response.status === 200) {
                loc == 'start' ? setStartLocationName(response.data.address.city) : setEndLocationName(response.data.address.city);
            } else {
                return 'Location not found';
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchLocationName(start_station_latitude, start_station_longitude, 'start');
        fetchLocationName(end_station_latitude, end_station_longitude, 'end');
    }, []);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleTicketTypeChange = (event) => {
        setTicketType(event.target.value);
    };

    const handleBookTicket = async () => {
        try {
            const formData = new FormData();
            formData.append('type', ticketType);
            formData.append('ride_id', ride_id);
            console.log(formData);

            const response = await axios.post('http://127.0.0.1:8000/api/book_ticket', 
            formData   
            );
            console.log(response.data);
            togglePopup();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="ride-card white-bg semi-rounded flex column gap-20">
            <div className="flex flex-end">
                <FontAwesomeIcon icon={faStar} className="primary-text"/>
                <p>{rating}</p>
            </div>
            <div className="flex gap-10">
                <FontAwesomeIcon icon={faLocationDot} className="primary-text"/>
                <p>{startLocationName} - {endLocationName}</p>
            </div>
            <div className="flex gap-10">
                <FontAwesomeIcon icon={faClock} className="primary-text"/>
                <p>{start_time.slice(0, 5)} - {end_time.slice(0, 5)}</p>
            </div>
            <div className="flex gap-10">
                <FontAwesomeIcon icon={faPeopleArrows} className="primary-text" />
                <p>{capacity} Seats</p>
            </div>
            <div className="flex center button-div">
                <button onClick={togglePopup}>Book Ticket</button>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content flex column">
                        <h2>Book Ticket</h2>
                        <select value={ticketType} onChange={handleTicketTypeChange}>
                            <option value="">Select Ticket Type</option>
                            <option value="one_way">One Way</option>
                            <option value="pass">Pass</option>
                        </select>
                        <button onClick={handleBookTicket}>Book Ticket</button>
                        <button onClick={togglePopup}>Close</button>
                    </div>


                </div>
            )}

        </div>
    )
}

export default UserRideCard;