import React, { useEffect, useState } from "react";
import Station from "./Station";
import sendRequest from "../../../core/tools/remote/request.js";
import PopUp from "../../../components/PopUp";
const Stations = () => {
  const [stations, setStations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    sendRequest("GET", "stations").then((response) => {
      setStations(response.data.data);
    });
  }, []);

  return (
    <>
      <h1 className="p-relative fs-30">Stations</h1>
      <div className="stations-page p-relative d-grid gap-20 m-20">
        {stations?.map((station) => {
          return (
            <Station key={station.id} station={station} openPopup={openPopup} />
          );
        })}
      </div>
      {showPopup && (
        <PopUp
          closePopup={closePopup}
          buttenText="Update"
          formTitle="Update Station"
          isOpen={showPopup}
          closePopUp={closePopup}
        >
          <div>
            <label htmlFor="facilities">Facilities</label>
            <input
              type="text"
              name="facilities"
              placeholder="enter the available facilities"
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <input
              type="text"
              name="status"
              placeholder="enter the station status"
            />
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Stations;
