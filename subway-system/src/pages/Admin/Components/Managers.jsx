import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Manager from "./Manager";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import PopUp from "../../../components/PopUp";
const Managers = () => {
  const [branches, setBranches] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateBranch, setUpdateBranch] = useState({ status: "" });
  const [sentEmail, setSentEmail] = useState({ email: "" });
  const openPopup = (branch) => {
    setShowPopup(true);
    setSelectedBranch(branch);
    setUpdateBranch({
      status: branch.status,
    });
  };
  const openAddPopup = () => {
    setShowAddPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const closeAddPopup = () => {
    setShowAddPopup(false);
  };
  const getBranches = () => {
    const response = sendRequest(requestMehods.GET, "branches")
      .then((response) => {
        if (response.data.status === "success") {
          setBranches(response.data.data);
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDeleteBranch = (id) => {
    const response = sendRequest(requestMehods.DELETE, `branches/${id}`).then(
      (response) => {
        setLoading(true);
        if (response.data.status === "success") {
          toast.success(response.data.message);
          setLoading(false);
          getBranches();
        }
      }
    );
  };
  const handleSubmit = () => {
    const response = sendRequest(
      requestMehods.PUT,
      `branches/${selectedBranch.id}`,
      updateBranch
    )
      .then((response) => {
        if (response.data.status === "success") {
          closePopup();
          setLoading(true);
          toast.success(response.data.message);
          getBranches();
        }
      })
      .finally(() => {
        getBranches();
      });
  };
  const handleAddSubmit = () => {
    const response = sendRequest(requestMehods.POST, "email", sentEmail)
      .then((response) => {
        if (response.data.status === "success") {
          setLoading(true);
          closeAddPopup();
          toast.success(response.data.message);
          getBranches();
        }
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
  useEffect(() => {
    getBranches();
  }, []);
  return (
    <div className="content w-full">
      <div className="title d-flex gap-50 align-center">
        <h1 className="fs-30">Managers</h1>
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
        <div className="managers-page d-grid gap-20 m-20">
          {branches?.map((branch) => {
            return (
              <Manager
                key={branch.id}
                openPopup={openPopup}
                deleteBranch={handleDeleteBranch}
                branch={branch}
              />
            );
          })}
        </div>
      )}
      {showPopup && (
        <PopUp
          closePopup={closePopup}
          buttenText="Update"
          formTitle="Update Branch"
          isOpen={showPopup}
          handleSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          closePopUp={closePopup}
        >
          <div>
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={updateBranch.status}
              onChange={(e) => {
                setUpdateBranch({
                  ...updateBranch,
                  status: e.target.value,
                });
              }}
              id="status"
            >
              <option value="">Select the status</option>
              <option value="active">Active</option>
              <option value="shutdown">Shutdown</option>
            </select>
          </div>
        </PopUp>
      )}
      {showAddPopup && (
        <PopUp
          closePopup={closeAddPopup}
          buttenText="Create"
          formTitle="Send Invitation"
          isOpen={showAddPopup}
          handleSubmit={(e) => {
            e.preventDefault();
            handleAddSubmit();
          }}
          closePopUp={closeAddPopup}
        >
          <div>
            <label htmlFor="status">Email</label>
            <input
              type="email"
              onChange={(e) => {
                setSentEmail({
                  ...sentEmail,
                  email: e.target.value,
                });
              }}
              placeholder="Enter the email"
            />
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default Managers;
