import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import StationCard from "./components/StationCard"
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";

const UserStation = () => {

    return (
        <div className="page light-bg flex column">
            <NavBar/>
            <div className="input-container white-bg">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input type="text" placeholder="Beirut" className="search-input"/>
            </div>
            <div className="padding">
                <h2 className="padding-bottom">Nearest Stations</h2>
                <div className="flex gap center wrap">
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                </div>
                
            </div>
            <div className="padding">
                <h2 className="padding-bottom">Highest Rating Stations</h2>
                <div className="flex gap center wrap">
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                </div>
            </div>
            <div className="padding">
                <h2 className="padding-bottom">All Stations</h2>
                <div className="flex gap center wrap">
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                    <StationCard/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default UserStation;