import './style.css';
import authimg from '../../assets/images/auth.jpg';
import logo from '../../assets/images/logo.svg';

import sendRequest from '../../core/tools/remote/request';
import { requestMehods } from "../../core/enums/requestMethods";
import { useEffect, useState } from 'react';
import SigninForm from './Components/SigninForm';
import SignupForm from './Components/SignupForm';
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';

const Authentication = ({logout}) => {
    const [isSignin, setIsSignin] = useState(true);
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            navigate('/auth');
            const response = await sendRequest(requestMehods.POST, "/logout");
            if (response.data.status === 'success') {
                const cookie = new Cookies();
                cookie.remove('token');
                cookie.remove('user_type');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    const handleSetSignIn = () => {
        setIsSignin(true);
    }

    useEffect(() => {
        if (logout) { handleLogout(); }
    }, []);
        
    return <div className='auth-page flex full-width full-height'>
        <div className='auth-container flex column center gap-50 half-width secondary-bg'>
            <img className='auth-logo' src={logo} />
            <div className='flex row gap-50 mt-30'>
                <button className={`auth-tab lexend-text sm-text white-text secondary-bg  ${isSignin && 'active-tab'}`}
                    onClick={() => setIsSignin(true)}>SIGN IN</button>
                <button className={`auth-tab lexend-text sm-text white-text secondary-bg  ${!isSignin && 'active-tab'}`}
                    onClick={() => setIsSignin(false)}>SIGN UP</button>
            </div>
            {isSignin ? <SigninForm/> : <SignupForm handleSetSignIn={handleSetSignIn} />}
        </div>
        <img className='auth-img half-width' src={authimg}/>
    </div>
};

export default Authentication;