import React from "react";
import "./style.css";
import RideCardReview from "./components/RideCardReview";
import sendRequest from "../../core/tools/remote/request";
import { requestMehods } from "../../core/enums/requestMethods";
import { useEffect, useState } from "react";
import Message from "./components/Message";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CoinRequests from "./components/CoinRequests";
import { BeatLoader } from "react-spinners";

const UserProfile = () => {
  const [messages, setMessages] = useState();
  const [replies, setReplies] = useState();
  const [name, setName] = useState();
  const [loading, setLoading] = useState();
  const [passengerRides, setPassengerRides] = useState([]);

  const messagesHistory = async () => {
    try {
      const res = await sendRequest(
        requestMehods.GET,
        "/passengermessages",
        {}
      );
      if (res.data.status === "success") {
        setMessages(res.data.passenger_messages);
        setReplies(res.data.branch_replies);
        setName(res.data.name);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const getPassengerRides = () => {
    const response = sendRequest(
      requestMehods.GET,
      "view_passenger_rides"
    ).then((response) => {
      setPassengerRides(response.data.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    setLoading(true);
    messagesHistory();
    getPassengerRides();
  }, []);

  return (
    <div className="page light-bg flex column">
      {loading ? (
        <BeatLoader
          className="loader"
          color={"#35b368"}
          loading={loading}
          size={50}
        />
      ) : (<>
      <NavBar />
      <p className="user-name lg-text bold">{name}</p>
      <CoinRequests />
      <div>
        <h3 className="padding">Messages History</h3>
        <div className="messages-container flex column gap-20 center wrap">
          {messages?.map((message, i) => {
            return (
              <Message
                key={i}
                name={name}
                sender={message.station_name}
                content={message.content}
                reply={false}
              />
            );
          })}
          {replies?.map((reply, i) => {
            return (
              <Message
                key={i}
                name={name}
                sender={reply.station_name}
                content={reply.content}
                reply={true}
              />
            );
          })}
        </div>
        <h3 className="padding">Rides History</h3>
        <div className="flex gap center padding wrap">
          {passengerRides?.map((ride, i) => {
            return <RideCardReview key={i} ride={ride} />;
          })}
        </div>
      </div>
      <Footer /></>
      )}
    </div>
  );
};

export default UserProfile;
