import sendRequest from '../../../core/tools/remote/request';
import { requestMehods } from "../../../core/enums/requestMethods";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie"
import { useNavigate } from 'react-router';

const SigninForm = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const signin = async () => {
    if (credentials.email === "" || credentials.password == "") {
      setError("Email and password are required");
      return;
    }

    if (error !== "")
      return;

    try {
      const res = await sendRequest(requestMehods.POST, "/login", {
        'email': credentials.email,
        'password': credentials.password
      });
      
      const cookie = new Cookies();
      if (res.data.status === "success") {
        cookie.set('token', res.data.authorization.token);
        cookie.set('user_type', res.data.user.role_id);
        const userType = res.data.user.role_id;
        if(userType === 1) { navigate('/admin/overview') }
        else if(userType === 2) { navigate('/branch/stations') }
        else { navigate('/') }
      }
    } catch (e) {
      setError('Incorrect credentials');
      console.error(e);
    }
  }

  useEffect(() => {
    if (!emailRegex.test(credentials.email)) {
      setError("Invalid email address");
    } else if (credentials.password.length < 6) {
      setError("Short password");
    } else {
      setError("");
    }
  }, [credentials]);

  useEffect(() => {
    setError('');
  }, []);

  return (
      <>
        <div className='flex column gap-20'>
          <input className='input lexend-text semi-rounded sm-text' type="text" placeholder='Email'
          onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }); }} />
        
          <input className='input lexend-text semi-rounded sm-text' type="password" placeholder='Password' 
          onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }); }} />
        
          {error && <p className='red-text xsm-text'>{error}</p>}
        </div>
        <button onClick={signin} className='submit-btn sm-text bold primary-bg white-text semi-rounded'>Sign in</button>
    </>
  )
}

export default SigninForm;