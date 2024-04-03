import React from 'react'
import sendRequest from '../../../core/tools/remote/request';
import { requestMehods } from "../../../core/enums/requestMethods";
import { useEffect, useState } from "react";

const CoinRequests = () => {
    const [requests, setRequests] = useState();

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const time = `${hours}:${minutes}`;
        return `${formattedDate} ${time}`;
    }

    const requestsHistory = async () => {
        try {
            const res = await sendRequest(requestMehods.GET, "/usercoinrequests", {});
            if (res.data.status === 'success') {
                setRequests(res.data.coin_requests);
                console.log(res.data.coin_requests);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        requestsHistory();
    }, []);
    
    return (
        <div className="flex column wrap ">
            <h3 className="padding">Coin requests History</h3>
            <div className="button-div padding">
                <button>Request Coins</button>
            </div>
            <div className='requests-container flex column center gap-20'>
                {requests != null &&
                    requests?.map((request, i) => {
                    return <div className="flex wrap center white-bg semi-rounded">
                                <p className="small-card-padding">{request.amount}$</p>
                                <p className="small-card-padding">{formatDate(request.date)}</p>
                                <p className={`small-card-padding ${request.coin_request_status == "Pending"
                                ? 'yellow-text' : (request.coin_request_status == "Approved"
                                    ? 'green-text' : 'red-text')}`}>
                                    {request.coin_request_status}</p>
                            </div>
                })}
            </div>
        </div>
    )
}

export default CoinRequests