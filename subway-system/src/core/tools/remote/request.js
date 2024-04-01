import axios from "axios";
//import { useNavigate } from "react-router-dom";
const sendRequest = async (method, route, body) => {
  try {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
    //const navigate = useNavigate();

    const response = await axios.request({
      method: method,
      url: route,
      data: body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // if (response.status === 401) {
    //   localStorage.removeItem("token");
    //     navigate("/auth");
    // }

    console.log(response);

    return response;
  } catch (error) { throw error; }
};

export default sendRequest;
