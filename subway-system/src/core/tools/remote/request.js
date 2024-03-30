import axios from "axios";
import { requestMehods } from "../../enums/requestMethods";
import { Navigate, useNavigate } from "react-router";

axios.defaults.baseURL = "http://localhost:8000/api";

export const sendRequest = async (method, route, body) => {
  const response = await axios.request({
    method: method,
    url: route,
    data: body,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    // Navigate("/auth");
  }

  return response;
};
