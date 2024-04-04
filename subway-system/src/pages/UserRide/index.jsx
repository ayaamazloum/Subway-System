import "./style.css";
import React, { useEffect, useState } from "react";
import UserRideCard from "./components/UserRideCard";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../core/tools/remote/request";
import { requestMehods } from "../../core/enums/requestMethods";
import { toast } from "react-toastify";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import "./style.css";

const UserRide = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stationName = searchParams.get("stationName");
  const locationName = searchParams.get("locationName");
  const stationId = searchParams.get("id");
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const sendMessage = async () => {
    try {
      const res = await sendRequest(requestMehods.POST, "/passengermessages", {
        receiver_id: rides[0].start_station_id,
        content: message,
      });
      if (res.data.status === "success") {
        toast.success("Message sent successfully. We will reply soon.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/view_station_rides/${stationId}`
      );
      if (!response.ok) {
        throw new Error("failed to fetch rides");
      }
      const data = await response.json();
      setRides(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLoader = () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <div className="page light-bg flex column">
      {loading ? (
        <BeatLoader
          className="loader"
          color={"#35b368"}
          loading={loading}
          size={50}
        />
      ) : (
        <>
          <NavBar />
          <div className="flex space-between padding">
            <div>
              <h1>{stationName}</h1>
            </div>
            <div className="flex center">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="primary-text adj-size"
              />
              <h1>{locationName}</h1>
            </div>
          </div>
          <div className="flex center gap-20">
            <div className="message-input-container white-bg semi-rounded flex center">
              <FontAwesomeIcon
                icon={faMessage}
                className="primary-text margin-left"
              />
              <input
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Have anything to tell us?"
                className="message-input"
              />
            </div>
            <div className="button-div">
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
          <div className="padding">
            <h3 className="padding-bottom">List of Rides</h3>
            <div className="flex center wrap padding gap-40">
              {rides.map((ride, index) => (
                <UserRideCard
                  closeLoader={handleLoader}
                  key={index}
                  ride={ride}
                />
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default UserRide;
