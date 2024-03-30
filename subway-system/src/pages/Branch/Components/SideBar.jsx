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
const SideBar = () => {
  return (
    <div className="sidebar bg-white p-20 p-relative">
      <h3 className="p-relative txt-c mt-0">
        <img srcSet={logo} alt="Your Way" />
      </h3>
      <ul className="list-none p-0">
        <li>
          <a
            className=" d-flex align-center fs-14 c-black rad-6 p-10"
            href="index.html"
          >
            <FontAwesomeIcon icon={faMapPin} />
            <span className="hide-mobile">Stations</span>
          </a>
        </li>
        <li>
          <a className="  d-flex align-center fs-14 c-black rad-6 p-10">
            <FontAwesomeIcon icon={faMapLocationDot} />
            <span className="hide-mobile">Rides</span>
          </a>
        </li>
        <li>
          <a className="  d-flex align-center fs-14 c-black rad-6 p-10">
            <FontAwesomeIcon icon={faComments} />
            <span className="hide-mobile">Reviews</span>
          </a>
        </li>
        <li>
          <a className="  d-flex align-center fs-14 c-black rad-6 p-10">
            <FontAwesomeIcon icon={faCommentDots} />
            <span className="hide-mobile">Messages</span>
          </a>
        </li>
        <li>
          <a className=" d-flex align-center fs-14 c-black rad-6 p-10">
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            <span className="hide-mobile">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
