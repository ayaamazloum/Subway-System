import React from "react";
import "./style.css";
import RideCardReview from "./components/RideCardReview";
import sendRequest from '../../core/tools/remote/request';
import { requestMehods } from "../../core/enums/requestMethods";
import { useEffect, useState } from "react";
import Message from "./components/Message";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";

const UserProfile = () => {
    const [messages, setMessages] = useState();
    const [replies, setReplies] = useState();
    
    const messagesHistory = async () => {
    try {
        const res = await sendRequest(requestMehods.GET, "/passengermessages", {});
        if (res.data.status === 'success') {
            setMessages(res.data.passenger_messages);
            setReplies(res.data.branch_replies);
        }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        messagesHistory();
    }, []);

    return (
        <div className="page light-bg flex column">
            <NavBar/>
            <div className="button-div padding">
                <button>Request Coins</button>
            </div>
            <div>
                <h3 className="padding">Messages History</h3>
                <div className="messages-container flex gap center wrap">
                    {messages?.map((message, i) => {
                        return <Message key={i} sender={message.station_name} content={message.content} reply={false} />
                    })}
                    {replies?.map((reply, i) => {
                        return <Message key={i} sender={reply.station_name} content={reply.content} reply={true} />
                    })}
                </div>
                <h3 className="padding">Rides History</h3>
                <div className="flex gap center padding wrap">
                    <RideCardReview />
                    <RideCardReview />
                    <RideCardReview />
                    <RideCardReview />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default UserProfile;