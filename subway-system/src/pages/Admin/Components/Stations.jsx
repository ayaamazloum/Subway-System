import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../../components/PopUp";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import Station from "./Station";
import "../Styles/index.css";
const Stations = () => {
  const [stations, setStations] = useState();
  const [selectedStation, setSelectedStation] = useState();
  const [branches, setBranches] = useState();
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [addStation, setAddStation] = useState({
    name: "",
    facilities: "",
    operating_hours: "",
    branch_id: 0,
    latitude: 0,
    longitude: 0,
  });
  const [editStation, setEditStation] = useState({
    name: "",
    facilities: "",
    operating_hours: "",
    branch_id: 0,
    latitude: 0,
    longitude: 0,
  });

  const openPopup = (station) => {
    setShowPopup(true);
    setSelectedStation(station);
    setEditStation({
      name: station.name,
      facilities: station.facilities,
      operating_hours: station.operating_hours,
      branch_id: station.branch_id,
      latitude: station.latitude,
      longitude: station.longitude,
    });
  };
  const openAddPopup = () => {
    setShowAddPopup(true);
  };
  const closeAddPopup = () => {
    setShowAddPopup(false);
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  const getStationData = () => {
    const response = sendRequest(requestMehods.GET, "stations").then(
      (response) => {
        setStations(response.data.data.stations);
        setBranches(response.data.data.branches);
        setLoading(false);
      }
    );
  };
  const handleAddSubmit = () => {
    const response = sendRequest(requestMehods.POST, "stations", addStation)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(response.data.message);
          closeAddPopup();
          setLoading(true);
          getStationData();
        }
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
  const handleDeleteAction = (id) => {
    const response = sendRequest(requestMehods.DELETE, `stations/${id}`)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(response.data.message);
          setLoading(true);
          getStationData();
        }
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
  const handleEditSubmit = () => {
    const response = sendRequest(
      requestMehods.PUT,
      `stations/${selectedStation.id}`,
      editStation
    )
      .then((response) => {
        if (response.data.status === "success") {
          closePopup();
          toast.success(response.data.message);
          setLoading(true);
          getStationData();
        }
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
  useEffect(() => {
    getStationData();
  }, []);
  return (
    <>
      <div className="content w-full">
        <div className="title d-flex gap-50 align-center">
          <h1 className="fs-30">Stations</h1>
          <button>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={(e) => {
                e.preventDefault();
                openAddPopup();
              }}
            />
          </button>
        </div>
        {loading ? (
          <BeatLoader
            className="loader"
            color={"#35b368"}
            loading={loading}
            size={50}
          />
        ) : (
          <div className="stations-page p-relative d-grid gap-20 m-20">
            {stations?.map((station) => {
              return (
                <Station
                  key={station.id}
                  station={station}
                  openPopup={openPopup}
                  deleteStation={handleDeleteAction}
                />
              );
            })}
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
              handleEditSubmit();
            }}
            closePopUp={closePopup}
          >
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={editStation.name}
                onChange={(e) => {
                  setEditStation({
                    ...editStation,
                    name: e.target.value,
                  });
                }}
                placeholder="Enter the name"
              />
            </div>
            <div>
              <label htmlFor="facilities">Facilities</label>
              <input
                value={editStation.facilities}
                type="text"
                onChange={(e) => {
                  setEditStation({
                    ...editStation,
                    facilities: e.target.value,
                  });
                }}
                placeholder="Enter the facilities"
              />
            </div>
            <div>
              <label htmlFor="hours">Operating Hours</label>
              <input
                type="text"
                name="hours"
                value={editStation.operating_hours}
                id="hours"
                onChange={(e) => {
                  setEditStation({
                    ...editStation,
                    operating_hours: e.target.value,
                  });
                }}
                placeholder="Enter the operating hours"
              />
            </div>
            <div>
              <label htmlFor="branch">Assign to Branch</label>
              <select
                value={editStation.branch_id}
                onChange={(e) => {
                  setEditStation({
                    ...editStation,
                    branch_id: e.target.value,
                  });
                }}
                name="branch"
                id="branch"
              >
                <option value="">Choose a Branch</option>
                {branches?.map((branch) => {
                  return <option value={branch.id}>{branch.user.name}</option>;
                })}
              </select>
            </div>
            <div>
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                value={editStation.latitude}
                id="latitude"
                onChange={(e) => {
                  setEditStation({
                    ...editStation,
                    latitude: e.target.value,
                  });
                }}
                placeholder="Enter the latitude"
              />
            </div>
            <div>
              <label htmlFor="status">longitude</label>
              <input
                type="number"
                value={editStation.longitude}
                name="longitude"
                id="longitude"
                onChange={(e) => {
                  setEditStation({
                    ...editStation,
                    longitude: e.target.value,
                  });
                }}
                placeholder="Enter the longitude"
              />
            </div>
          </PopUp>
        )}
        {showAddPopup && (
          <PopUp
            closePopup={closeAddPopup}
            buttenText="Create"
            formTitle="Create Station"
            isOpen={showAddPopup}
            handleSubmit={(e) => {
              e.preventDefault();
              handleAddSubmit();
            }}
            closePopUp={closeAddPopup}
          >
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter the name"
                onChange={(e) => {
                  setAddStation({
                    ...addStation,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="facilities">Facilities</label>
              <input
                type="text"
                onChange={(e) => {
                  setAddStation({
                    ...addStation,
                    facilities: e.target.value,
                  });
                }}
                placeholder="Enter the facilities"
              />
            </div>
            <div>
              <label htmlFor="hours">Operating Hours</label>
              <input
                type="text"
                name="hours"
                id="hours"
                onChange={(e) => {
                  setAddStation({
                    ...addStation,
                    operating_hours: e.target.value,
                  });
                }}
                placeholder="Enter the operating hours"
              />
            </div>
            <div>
              <label htmlFor="branch">Assign to Branch</label>
              <select
                name="branch"
                onChange={(e) => {
                  setAddStation({
                    ...addStation,
                    branch_id: e.target.value,
                  });
                }}
                id="branch"
              >
                <option value="">Choose a Branch</option>
                {branches?.map((branch) => {
                  return <option value={branch.id}>{branch.user.name}</option>;
                })}
              </select>
            </div>
            <div>
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                name="latitude"
                id="latitude"
                onChange={(e) => {
                  setAddStation({
                    ...addStation,
                    latitude: e.target.value,
                  });
                }}
                placeholder="Enter the latitude"
              />
            </div>
            <div>
              <label htmlFor="status">longitude</label>
              <input
                type="text"
                name="longitude"
                id="longitude"
                onChange={(e) => {
                  setAddStation({
                    ...addStation,
                    longitude: e.target.value,
                  });
                }}
                placeholder="Enter the longitude"
              />
            </div>
          </PopUp>
        )}
      </div>
    </>
  );
};

export default Stations;
