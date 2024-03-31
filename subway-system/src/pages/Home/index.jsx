import './style.css';
import NavBar from "../Navbar";
import HeroImage from "../../assets/images/hero-img.svg";

const Home = () => {
    return <div className="home-page white-bg full-width full-height">
        <NavBar />

        <div className="hero-section flex column center gap-40">
            <img className="hero-img" src={HeroImage} />
            <div class="overlay"></div>
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
    </div>;
}

export default Home;