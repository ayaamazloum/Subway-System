import './style.css';
import darkLogo from '../../assets/images/dark-logo.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import sendRequest from '../../core/tools/remote/request';
import { requestMehods } from "../../core/enums/requestMethods";
import Cookies from "universal-cookie";

const NavBar = () => {
    const [collapsedNavlinks, setCollapsedNavlinks] = useState(false);
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
    const [isLogged, setIsLogged] = useState();

    const navigate = useNavigate();

    const handleMediaQueryChange = (event) => {
        setIsMobile(event.matches);
    };

    const handleLogout = async () => {
        try {
            const response = await sendRequest(requestMehods.POST, "/logout");
            if (response.data.status === 'success') {
                const cookie = new Cookies();
                cookie.remove('token');
                cookie.remove('user_type');
                navigate('/auth');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    const handleAuth = (logout) => {
        logout ? handleLogout() : navigate('/auth');
    }
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 900px)');
        setIsMobile(mediaQuery.matches);
    
        const mediaQueryListener = event => handleMediaQueryChange(event);
        mediaQuery.addEventListener("change", mediaQueryListener);

        const cookie = new Cookies();
        setIsLogged(cookie.get('token') && true);
    }, []);
    
    return (
        <div className='navbar flex white-bg full-width'>
            <img className='nav-logo' src={darkLogo} />
            {isMobile &&
                <FontAwesomeIcon icon={faBars} onClick={()=>setCollapsedNavlinks(!collapsedNavlinks)} /> 
            }
            <div className={`nav-links flex row center gap-70 ${collapsedNavlinks ? 'collapsed-navlinks':''}`}>
                <NavLink exact="true" to="/" activeclassname="active" className="sm-text secondary-text">Home</NavLink>
                <NavLink exact="true" to="/userstations" activeclassname="active-navitem" className="sm-text secondary-text">Stations</NavLink>
                {isLogged ? (<>
                    <NavLink exact="true" to="/userprofile" activeclassname="active-navitem" className="sm-text secondary-text">Profile</NavLink>
                    <button onClick={()=>handleAuth(true)} className='logout-btn sm-text semi-rounded primary-text white-bg'>Log out</button></>)
                    : <button onClick={()=>handleAuth(false)} className='logout-btn sm-text semi-rounded primary-text white-bg'>Log in</button>
                }
            </div>
        </div>
    );
};

export default NavBar;