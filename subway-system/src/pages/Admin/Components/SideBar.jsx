import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faChartSimple,
  faDollarSign,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

import logo from "../../Branch/Assets/logo.svg";
import { useNavigate } from "react-router-dom";
import "../Styles/index.css";
const SideBar = () => {
  const navigate = useNavigate();
  const logoutAdmin = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    cookies.remove("user_type");
    navigate("/auth");
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
              navigate("/admin/overview");
            }}
            className="d-flex align-center fs-18 c-black rad-6 p-10"
          >
            <FontAwesomeIcon icon={faChartSimple} />
            <span className="hide-mobile">OverView</span>
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/branches");
            }}
            className="d-flex align-center fs-18 c-black rad-6 p-10"
          >
            <FontAwesomeIcon icon={faUsers} />
            <span className="hide-mobile">Managers</span>
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/coinrequests");
            }}
            className="d-flex align-center fs-18 c-black rad-6 p-10"
          >
            <FontAwesomeIcon icon={faDollarSign} />
            <span className="hide-mobile">CoinRequests</span>
          </a>
        </li>
        <li>
          <a
            className="d-flex align-center fs-18 c-black rad-6 p-10"
            onClick={(e) => {
              e.preventDefault();
              logoutAdmin();
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
