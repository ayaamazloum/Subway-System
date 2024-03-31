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
    </div>;
}

export default Home;