import './style.css';
import authimg from '../../assets/images/auth.jpg';
import logo from '../../assets/images/logo.svg'

import { useState } from 'react';
import SigninForm from './Components/SigninForm';
import SignupForm from './Components/SignupForm';

const Authentication = () => {
    const [ isSignin, setIsSignin ] = useState(true);
        
    return <div className='auth-page flex full-width full-height'>
        <div className='auth-container flex column center gap-50 half-width secondary-bg'>
            <img className='auth-logo' src={logo} />
            <div className='flex row gap-50 mt-30'>
                <button className='auth-tab lexend-text sm-text white-text secondary-bg active-tab'
                    onClick={() => setIsSignin(true)}>
                    SIGN IN</button>
                <button className='auth-tab lexend-text sm-text white-text secondary-bg'
                    onClick={() => setIsSignin(false)}>SIGN UP</button>
            </div>
            {isSignin ? <SigninForm/> : <SignupForm/>}
        </div>
        <img className='auth-img half-width' src={authimg}/>
    </div>
};

export default Authentication;