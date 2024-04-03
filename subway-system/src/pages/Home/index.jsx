import './style.css';
import NavBar from "../../components/Navbar";
import Footer from '../../components/Footer';
import Hero from './Components/Hero';
import BranchesMap from './Components/BranchesMap';
import Numbers from './Components/Numbers';
import Download from './Components/Download';

const Home = () => {
    return <div className="home-page white-bg full-width full-height">
        <NavBar />
        <Hero />
        <BranchesMap />
        <Numbers />
        <Download />
        <Footer />
    </div>;
}

export default Home;