import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';

const sendRequest = async (method, route, body) => {

  try {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

    const cookie = new Cookies();

    const response = await axios.request({
      method: method,
      url: route,
      data: body,
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    throw error;
  }
};

export default sendRequest;
