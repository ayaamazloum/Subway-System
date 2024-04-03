import axios from "axios";
import Cookies from "universal-cookie";

const sendRequest = async (method, route, body) => {

  try {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

    const cookie = new Cookies();
    const token = cookie.get('token');
    const user_type = cookie.get('user_type');

    // if (user_type == 3) {
    //   const refreshResponse = await axios.request({
    //     method: 'GET',
    //     url: '/refresh',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   console.log(refreshResponse);
    // }

    const response = await axios.request({
      method: method,
      url: route,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default sendRequest;
