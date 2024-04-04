import "./style.css";
import authimg from "../../assets/images/auth.jpg";
import logo from "../../assets/images/logo.svg";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import sendRequest from "../../core/tools/remote/request";
import { requestMehods } from "../../core/enums/requestMethods";
import { toast } from "react-toastify";

const BranchAuthentication = () => {
  const [location] = useSearchParams();
  const navigate = useNavigate();
  const [branchCredentials, setBranchCredentials] = useState({
    email: location.get("email"),
    key: location.get("key"),
    name: "",
    password: "",
  });
  const createAccount = () => {
    const response = sendRequest(
      requestMehods.POST,
      "registerbranch",
      branchCredentials
    )
      .then((response) => {
        if (response.data.status === "success") {
          navigate("/auth");
          toast.success(response.data.message);
          setBranchCredentials({
            email: "",
            key: "",
            name: "",
            password: "",
          });
        }
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        console.log(e);
      });
  };
  return (
    <div className="auth-page flex full-width full-height">
      <div className="auth-container flex column center gap-50 half-width secondary-bg">
        <img className="auth-logo" src={logo} />
        <button className="auth-tab lexend-text sm-text white-text secondary-bg">
          Accept Invitation
        </button>
        <div className="flex column gap-20">
          <input
            className="input lexend-text semi-rounded sm-text"
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setBranchCredentials({
                ...branchCredentials,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex column gap-20">
          <input
            className="input lexend-text semi-rounded sm-text"
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setBranchCredentials({
                ...branchCredentials,
                password: e.target.value,
              });
            }}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            createAccount();
          }}
          className="submit-btn sm-text bold primary-bg white-text semi-rounded"
        >
          Sign up
        </button>
      </div>
      <img className="auth-img half-width" src={authimg} />
    </div>
  );
};

export default BranchAuthentication;
