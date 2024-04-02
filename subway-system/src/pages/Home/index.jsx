import './style.css';
import NavBar from "../../components/Navbar";
import HeroImage from "../../assets/images/hero-img.svg";
import GooglePlay from "../../assets/icons/googleplay.svg";
import AppStore from "../../assets/icons/appstore.svg";
import DownloadBg from "../../assets/images/download-bg.svg";

import Footer from '../../components/Footer';

const Home = () => {
    return <div className="home-page white-bg full-width full-height">
        <NavBar />

        <div className="hero-section flex column center gap-40">
            <img className="hero-img" src={HeroImage} />
            <div className="overlay"></div>
            <h1 className='hero-text white-text'>Welcome to the <span className='primary-text'>Heartbeat</span> of the City </h1>
            <p className='hero-desc sm-text white-text'>Join us as we redefine urban mobility, one station at a time. Step aboard and let the journey begin.</p>
            <button className='hero-btn primary-bg sm-text white-text bold rounded'>Explore The Way</button>
        </div>

        <div className="map-section section flex column center">
            <h1 className='secondary-text'>BROWSE OUR <span className='primary-text'>BRANCHES</span></h1>
        </div>

        <div className="numbers-section section flex row">
            <div className='number-item flex column'>
                <p className='number lg-text bold secondary-text'>50+</p>
                <p className='xsm-text light-text'>Active Stations</p>
            </div>
            <div className='number-item flex column'>
                <p className='number lg-text bold secondary-text'>150+</p>
                <p className='xsm-text light-text'>Daily Rides</p>
            </div>
            <div className='number-item flex column'>
                <p className='number lg-text bold secondary-text'>10k+</p>
                <p className='xsm-text light-text'>Satisfied Passengers</p>
            </div>
            <div className='number-item flex column'>
                <p className='number lg-text bold secondary-text'>500+</p>
                <p className='xsm-text light-text'>Experienced Staff Members</p>
            </div>
        </div>

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

        <Footer/>
    </div>;
}

export default Home;