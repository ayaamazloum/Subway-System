import React from 'react';
import GooglePlay from "../../../assets/icons/googleplay.svg";
import AppStore from "../../../assets/icons/appstore.svg";
import DownloadBg from "../../../assets/images/download-bg.svg";

const Download = () => {
  return (
    <div className='download-section flex column center gap-40 primary-bg rounded'>
        <img className='download-bg' src={DownloadBg} />
        <h1 className='large-text white-text'>Let us deliver you to your destination.</h1>
        <div className="download-buttons flex row gap-20">
            <button className='download-btn flex row center gap-10 white-bg bold secondary-text xsm-text semi-rounded'>
                <img className='download-icon' src={GooglePlay} />
                Google Play
            </button>
            <button className='download-btn flex row center gap-10 white-bg bold secondary-text xsm-text semi-rounded'>
                <img className='download-icon' src={AppStore} />
                App Sore
            </button>
        </div>
    </div>
  )
}

export default Download