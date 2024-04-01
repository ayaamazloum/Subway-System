import axios from "axios";
//import { useNavigate } from "react-router-dom";


export const sendRequest = async (method, route, body) => {
  try {
    axios.defaults.baseURL = "http://localhost:8000/api";
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

    return response;
  } catch (error) { console.error(error)}
};
