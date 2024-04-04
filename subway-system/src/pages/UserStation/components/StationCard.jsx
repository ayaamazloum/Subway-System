import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faStar,
  faClock,
  faRestroom,
  faWheelchair,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

const StationCard = ({ station, datafetched }) => {
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("");
  const { id, name, latitude, longitude, average_rating, operating_hours } =
    station;

  useEffect(() => {
    handleConvert();
  }, []);

  const handleConvert = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (response.status === 200) {
        setLocationName(response.data.address.city);
        datafetched();
      } else {
        setLocationName("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
  return (
    <div className="station-card white-bg semi-rounded flex column center gap-40">
      <div className="flex space-between gap">
        <p>{name}</p>
        <div className="flex center gap-10">
          <FontAwesomeIcon icon={faLocationDot} className="primary-text" />
          <p>{locationName}</p>
        </div>
        <div className="flex center small-gap">
          <p>{average_rating}</p>
          <FontAwesomeIcon icon={faStar} className="primary-text" />
        </div>
      </div>
      <div className="flex center small-gap">
        <FontAwesomeIcon icon={faClock} className="primary-text" />
        <p>{operating_hours}</p>
      </div>
      <div className="flex center button-div">
        <button
          onClick={() => {
            navigate(
              `/userride?stationName=${name}&locationName=${locationName}&id=${id}`
            );
          }}
        >
          View Rides
        </button>
      </div>
      <div className="flex gap-40 icons-div">
        <FontAwesomeIcon icon={faRestroom} className="primary-text" />
        <FontAwesomeIcon icon={faWheelchair} className="primary-text" />
        <FontAwesomeIcon icon={faWifi} className="primary-text" />
      </div>
    </div>
  );
};

export default StationCard;
