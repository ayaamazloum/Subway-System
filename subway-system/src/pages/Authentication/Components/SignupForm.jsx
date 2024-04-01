import  sendRequest  from '../../../core/tools/remote/request';
import { requestMehods } from "../../../core/enums/requestMethods";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SignupForm = () => {
  const [credentials, setCredentials] = useState({ first_name: "", last_name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [longitude, setlongitude] = useState();
  const [latitude, setlatitude] = useState();
  //const navigate = useNavigate();

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const signup = async () => {
    if (credentials.first_name === "" || credentials.last_name === "" || credentials.email === "" || credentials.password == "") {
      setError("Please fill in all the fields");
      return;
    }

    if (error !== "")
      return;

    try {
      const res = await sendRequest(requestMehods.POST, "/register", {
        'name': credentials.first_name + " " + credentials.last_name,
        'email': credentials.email,
        'password': credentials.password,
        'longitude': longitude,
        'latitude': latitude
      });
    } catch (error) {
      setError(error.response.data.errors.email);
    }
    
    // if (res.data.status === "success") {
    //   //localStorage.setItem("token", res.data.token);
    //   //notification
    //   navigate("/auth");
    // }
  }

  useEffect(() => {
    console.log(error);
    if (!emailRegex.test(credentials.email)) {
      setError("Invalid email address");
    } else if (credentials.password.length < 6) {
      setError("Short password");
    } else {
      setError("");
    }
  }, [credentials]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setlongitude(position.coords.longitude);
        setlatitude(position.coords.latitude);
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      //error message
      return;
    }
    setError('');
  }, []);

  return (
      <>
        <div className='flex column gap-20'>
          <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='First Name'
          onChange={(e) => { setCredentials({ ...credentials, first_name: e.target.value }); }} />
        
          <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='Last Name' 
          onChange={(e) => { setCredentials({ ...credentials, last_name: e.target.value }); }} />
        
          <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='Email' 
          onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }); }} />
        
          <input className='input lexend-text semi-rounded sm-text' type="password" placeholder='Password' 
          onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }); }} />
        
          {error != "" && <p className='red-text xsm-text'>{error}</p>}
        </div>
        <button onClick={signup} className='submit-btn sm-text bold primary-bg white-text semi-rounded'>Sign up</button>
    </>
  )
}

export default SignupForm;