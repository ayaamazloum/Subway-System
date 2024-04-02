import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faMapPin,
  faComments,
  faCommentDots,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/logo.svg";
import { useNavigate } from "react-router-dom";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
import { toast } from "react-toastify";

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    sendRequest(requestMehods.POST, "logout").then((response) => {
      if (response.data.status === "success") {
        toast.success(response.data.message);
        navigate("/auth");
      }
    });
  };
  return (
    <div className="sidebar bg-white p-20 p-relative">
      <h3 className="p-relative txt-c mt-0">
        <img srcSet={logo} alt="Your Way" />
      </h3>
      <ul className="list-none p-0">
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/branch/stations");
            }}
            className="d-flex align-center fs-18 c-black rad-6 p-10"
          >
            <FontAwesomeIcon icon={faMapPin} />
            <span className="hide-mobile">Stations</span>
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/branch/rides");
            }}
            className="d-flex align-center fs-18 c-black rad-6 p-10"
          >
            <FontAwesomeIcon icon={faMapLocationDot} />
            <span className="hide-mobile">Rides</span>
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/branch/reviews");
            }}
            className="d-flex align-center fs-18 c-black rad-6 p-10"
          >
            <FontAwesomeIcon icon={faComments} />
            <span className="hide-mobile">Reviews</span>
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/branch/messages");
            }}
            className="d-flex align-center fs-18 c-black rad-6 p-10"
          >
            <FontAwesomeIcon icon={faCommentDots} />
            <span className="hide-mobile">Messages</span>
          </a>
        </li>
        <li>
          <a
            className="d-flex align-center fs-18 c-black rad-6 p-10"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            <span className="hide-mobile">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
