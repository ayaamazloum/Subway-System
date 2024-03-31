import './style.css';
import darkLogo from '../../assets/images/dark-logo.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const [collapsedNavlinks, setCollapsedNavlinks] = useState(false);
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
    
    const handleMediaQueryChange = (event) => {
        setIsMobile(event.matches);
    };
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 900px)');
        setIsMobile(mediaQuery.matches);
    
        const mediaQueryListener = event => handleMediaQueryChange(event);
        mediaQuery.addEventListener("change", mediaQueryListener);
    }, []);
    
    return (
        <div className='navbar flex white-bg full-width'>
            <img className='nav-logo' src={darkLogo} />
            {isMobile &&
                <FontAwesomeIcon icon={faBars} onClick={()=>setCollapsedNavlinks(!collapsedNavlinks)} /> 
            }
            <div className={`nav-links flex row center gap-70 ${collapsedNavlinks ? 'collapsed-navlinks':''}`}>
                <NavLink exact to="/" activeClassName="active" className="sm-text secondary-text">Home</NavLink>
                <NavLink exact to="/stations" activeClassName="active-navitem" className="sm-text secondary-text">Stations</NavLink>
                <NavLink exact to="/profile" activeClassName="active-navitem" className="sm-text secondary-text">Profile</NavLink>
                <button className='logout-btn sm-text semi-rounded primary-text white-bg'>Log out</button>
            </div>
        </div>
    );
};

export default NavBar;