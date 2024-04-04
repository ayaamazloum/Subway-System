import React, { useEffect, useState } from "react";
import Ride from "./Ride.jsx";
import sendRequest from "../../../core/tools/remote/request.js";
import PopUp from "../../../components/PopUp.jsx";
import { requestMehods } from "../../../core/enums/requestMethods.js";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const Rides = () => {
  const [rides, setRides] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateRide, setUpdateRide] = useState({
    id: 0,
    start_time: "",
    end_time: "",
    status: "",
  });

  const openPopup = (ride) => {
    setShowPopup(true);
    setUpdateRide({
      id: ride.id,
      start_time: ride.start_time,
      end_time: ride.end_time,
      status: ride.status,
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async () => {
    const response = await sendRequest(
      requestMehods.PUT,
      `rides/${updateRide.id}`,
      updateRide
    );
    setLoading(true);
    if (response.data.status === "success") {
      sendRequest("GET", "rides")
        .then((response) => {
          setRides(response.data.data.rides);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching rides:", error);
        });
      toast.success(response.data.message);
      closePopup();
    }
  };

  useEffect(() => {
    sendRequest("GET", "rides")
      .then((response) => {
        setRides(response.data.data.rides);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rides:", error);
      });
  }, []);

  return (
    <>
      <div className="content w-full">
        <h1 className="p-relative fs-30">Rides</h1>
        {loading ? (
          <BeatLoader
            className="loader"
            color={"#35b368"}
            loading={loading}
            size={50}
          />
        ) : (
          <div className="rides-page d-grid gap-20 m-20">
            {rides?.map((ride) => {
              return <Ride key={ride.id} Ride={ride} openPopup={openPopup} />;
            })}
          </div>
        )}
      </div>
      {showPopup && (
        <PopUp
          closePopup={closePopup}
          buttenText="Update"
          formTitle="Update Ride"
          isOpen={showPopup}
          handleSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          closePopUp={closePopup}
        >
          <div>
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              onChange={(e) => {
                setUpdateRide({
                  ...updateRide,
                  start_time: e.target.value,
                });
              }}
              value={updateRide.start_time}
              name="startTime"
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              onChange={(e) => {
                setUpdateRide({
                  ...updateRide,
                  end_time: e.target.value,
                });
              }}
              value={updateRide.end_time}
              name="endTime"
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={(e) => {
                setUpdateRide({
                  ...updateRide,
                  status: e.target.value,
                });
              }}
              value={updateRide.status}
              id="status"
            >
              <option value="">Select the status</option>
              <option value="ongoing">Ongoing</option>
              <option value="delayed">Delayed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Rides;
