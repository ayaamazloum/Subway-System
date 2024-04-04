import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faStar,
  faClock,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PopUp from "../../../components/PopUp";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
import { toast } from "react-toastify";

const UserRideCard = ({ ride, closeLoader }) => {
  const {
    ride_id,
    rating,
    start_station_longitude,
    start_station_latitude,
    end_station_longitude,
    end_station_latitude,
    start_time,
    end_time,
    capacity,
  } = ride;
  const [startLocationName, setStartLocationName] = useState("");
  const [endLocationName, setEndLocationName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [ticketData, setTicketData] = useState({
    type: "",
    ride_id: ride_id,
  });

  const fetchLocationName = async (latitude, longitude, loc) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      console.log(response.data.address.city);
      if (response.status === 200) {
        loc == "start"
          ? setStartLocationName(response.data.address.city)
          : setEndLocationName(response.data.address.city);
          closeLoader();
      } else {
        return "Location not found";
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchLocationName(start_station_latitude, start_station_longitude, "start");
    fetchLocationName(end_station_latitude, end_station_longitude, "end");
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleBookTicket = async () => {
    try {
      const response = await sendRequest(
        requestMehods.POST,
        "book_ticket",
        ticketData
      );
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setTicketData({
          type: "",
          ride_id: 0,
        });
        closePopup();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ride-card white-bg semi-rounded flex column gap-20">
      <div className="flex flex-end">
        <FontAwesomeIcon icon={faStar} className="primary-text" />
        <p>{rating}</p>
      </div>
      <div className="flex gap-10">
        <FontAwesomeIcon icon={faLocationDot} className="primary-text" />
        <p>
          {startLocationName} - {endLocationName}
        </p>
      </div>
      <div className="flex gap-10">
        <FontAwesomeIcon icon={faClock} className="primary-text" />
        <p>
          {start_time.slice(0, 5)} - {end_time.slice(0, 5)}
        </p>
      </div>
      <div className="flex gap-10">
        <FontAwesomeIcon icon={faPeopleArrows} className="primary-text" />
        <p>{capacity} Seats</p>
      </div>
      <div className="flex center button-div">
        <button onClick={openPopup}>Book Ticket</button>
      </div>
      {showPopup && (
        <PopUp
          closePopup={closePopup}
          buttenText="Book"
          formTitle="Book a ticket"
          isOpen={showPopup}
          handleSubmit={(e) => {
            e.preventDefault();
            handleBookTicket();
          }}
          closePopUp={closePopup}
        >
          <div>
            <label htmlFor="ticketType">Ticket Type</label>
            <select
              name="ticketType"
              onChange={(e) => {
                setTicketData({
                  ...ticketData,
                  type: e.target.value,
                });
              }}
              id="ticketType"
            >
              <option value="one_way">Select ticket type</option>
              <option value="one_way">One Way (${rating * 3})</option>
              <option value="pass">Multi Pass (${rating * 6})</option>
            </select>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default UserRideCard;
