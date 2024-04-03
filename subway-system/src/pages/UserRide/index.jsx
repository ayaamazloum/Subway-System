import "./style.css";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserRideCard from "./components/UserRideCard";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import sendRequest from '../../core/tools/remote/request';
import { requestMehods } from "../../core/enums/requestMethods";
import { toast } from 'react-toastify';
import { useState } from "react";

const UserRide = () => {
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        try {
            const res = await sendRequest(requestMehods.POST, "/passengermessages", {
                'receiver_id': 2,
                'content': message
            });
            if (res.data.status === 'success') {
                toast.success('Message sent successfully. We will reply soon.');
            }
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <div className="page light-bg flex column">
            <div className="flex space-between">
                <div>
                    <h1>Station 1</h1>
                </div>
                <div className="flex center">
                    <FontAwesomeIcon icon={faLocationDot} className="primary-text adj-size"/>
                    <h1>Beirut</h1>
                </div>
            </div>
            <div className="flex center">
                <div className="input-container white-bg semi-rounded flex">
                    <FontAwesomeIcon icon={faMessage} className="primary-text margin-left" />
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Have anything to tell us?"
                        className="message-input" />
                </div>
                <div className="button-div">
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
            <div className="padding">
                <h3 className="padding-bottom">List of Rides</h3>
                <div className="flex space-between padding">
                    <UserRideCard />
                    <UserRideCard />
                    <UserRideCard />
                    <UserRideCard />
                </div>
                <div className="flex space-between padding">
                    <UserRideCard />
                    <UserRideCard />
                    <UserRideCard />
                    <UserRideCard />
                </div>
            </div>

        </div>
    )
}

export default UserRide;