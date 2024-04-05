import React, { useEffect, useState } from "react";
import Station from "./Station";
import sendRequest from "../../../core/tools/remote/request.js";
import PopUp from "../../../components/PopUp";
import { requestMehods } from "../../../core/enums/requestMethods.js";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const Stations = () => {
  const [stations, setStations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateStation, setUpdateStation] = useState({
    facilities: "",
    service_status: "",
    operating_hours: "",
  });

  const openPopup = (station) => {
    setShowPopup(true);
    setSelectedStation(station);
    setUpdateStation({
      id: station.id,
      facilities: station.facilities,
      service_status: station.service_status,
      operating_hours: station.operating_hours,
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async () => {
    const response = await sendRequest(
      requestMehods.PUT,
      `branchstations/${selectedStation.id}`,
      updateStation
    );
    setLoading(true);
    if (response.data.status === "success") {
      closePopup();
      sendRequest("GET", "stations")
        .then((response) => {
          setStations(response.data.data);
        })
        .finally(() => {
          setLoading(false);
        });
      toast.success(response.data.message);
    }
  };

  useEffect(() => {
    sendRequest("GET", "branchstations").then((response) => {
      setStations(response.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className="p-relative fs-30">Stations</h1>
      <chrts  na/>
      {loading ? (
        <BeatLoader
          className="loader"
          color={"#35b368"}
          loading={loading}
          size={50}
        />
      ) : (
        <div className="stations-page p-relative d-grid gap-20 m-20">
          {stations.map((station) => (
            <Station key={station.id} station={station} openPopup={openPopup} />
          ))}
        </div>
      )}
      {showPopup && (
        <PopUp
          closePopup={closePopup}
          buttenText="Update"
          formTitle="Update Station"
          isOpen={showPopup}
          handleSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          closePopUp={closePopup}
        >
          <div>
            <label htmlFor="facilities">Facilities</label>
            <input
              type="text"
              value={updateStation.facilities}
              name="facilities"
              onChange={(e) => {
                setUpdateStation({
                  ...updateStation,
                  facilities: e.target.value,
                });
              }}
              placeholder="enter the available facilities"
            />
          </div>
          <div>
            <label htmlFor="operatingHours">Operation Hours</label>
            <input
              type="text"
              value={updateStation.operating_hours}
              name="operatingHours"
              onChange={(e) => {
                setUpdateStation({
                  ...updateStation,
                  operating_hours: e.target.value,
                });
              }}
              placeholder="enter the available facilities"
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={updateStation.service_status}
              onChange={(e) => {
                setUpdateStation({
                  ...updateStation,
                  service_status: e.target.value,
                });
              }}
              id="status"
            >
              <option value="">Select the status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Stations;
