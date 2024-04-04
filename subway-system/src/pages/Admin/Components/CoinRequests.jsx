import React, { useEffect, useState } from "react";
import CoinRequest from "./CoinRequest";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import PopUp from "../../../components/PopUp";

const CoinRequests = () => {
  const [coinrequests, setCoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [updateRequest, setUpdateRequest] = useState({
    status: "",
  });

  const openPopup = (coin) => {
    setShowPopup(true);
    setSelectedRequest(coin);
    setUpdateRequest({
      status: coin.status,
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const getCoinData = () => {
    sendRequest(requestMehods.GET, "coinrequests").then((response) => {
      const data = response.data.data;
      if (Array.isArray(data)) {
        const modifiedData = data.flatMap((passenger) => {
          const { name, email, coin_requests } = passenger;
          if (Array.isArray(coin_requests)) {
            return coin_requests.map((request) => ({
              name,
              email,
              amount: request.amount,
              status: request.status,
              id: request.id,
            }));
          }
          return [];
        });
        setCoinRequests(modifiedData);
        setLoading(false);
      } else {
        console.error("Response data is not an array:", data);
      }
    });
  };
  useEffect(() => {
    getCoinData();
  }, []);
  const handleDeleteAction = async (id) => {
    const response = sendRequest(
      requestMehods.DELETE,
      `coinrequests/${id}`
    ).then((response) => {
      setLoading(true);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setLoading(false);
        getCoinData();
      }
    });
  };
  const handleUpdateAction = async () => {
    const response = sendRequest(
      requestMehods.PUT,
      `coinrequests/${selectedRequest.id}`,
      updateRequest
    ).then((response) => {
      setLoading(true);
      if (response.data.status === "success") {
        closePopup();
        toast.success(response.data.message);
        setLoading(true);
        getCoinData();
      }
    });
  };
  return (
    <>
      <div className="content w-full">
        <h1 className="fs-30">CoinRequests</h1>
        {loading ? (
          <BeatLoader
            className="loader"
            color={"#35b368"}
            loading={loading}
            size={50}
          />
        ) : (
          <div className="coinrequests-page d-grid gap-20 m-20">
            {coinrequests.map((request) => (
              <CoinRequest
                key={request.id}
                openPopup={openPopup}
                coin={request}
                handleDeleteCoin={handleDeleteAction}
              />
            ))}
          </div>
        )}
        {showPopup && (
          <PopUp
            closePopup={closePopup}
            buttenText="Update"
            formTitle="Update Coin Request"
            isOpen={showPopup}
            handleSubmit={(e) => {
              e.preventDefault();
              handleUpdateAction();
            }}
            closePopUp={closePopup}
          >
            <div>
              <label htmlFor="status">Status</label>
              <select
                name="status"
                value={updateRequest.status}
                onChange={(e) => {
                  setUpdateRequest({
                    ...updateRequest,
                    status: e.target.value,
                  });
                }}
                id="status"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </PopUp>
        )}
      </div>
    </>
  );
};

export default CoinRequests;
