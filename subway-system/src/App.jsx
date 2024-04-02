import "./styles/utilities.css";
import "./styles/colors.css";

import Authentication from "./pages/Authentication";
import Main from "./pages/Branch/index.jsx";
import Rides from "./pages/Branch/Components/Rides.jsx";
import BranchRoutes from "./core/routes/BranchRoutes.jsx";
import AdminRoutes from "./core/routes/AdminRoutes.jsx";
import Home from "./pages/Home";

import UserStation from "./pages/UserStation/index.jsx";
import UserRide from "./pages/UserRide/index.jsx";
import UserProfile from "./pages/UserProfile/index.jsx";

import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import SideBar from "./pages/Branch/Components/SideBar.jsx";
import AdminSideBar from "./pages/Admin/Components/SideBar.jsx";
import Admin from "./pages/Admin/index.jsx";
import AdminManagers from "./pages/Admin/Components/Managers.jsx";
import CoinRequests from "./pages/Admin/Components/CoinRequests.jsx";
import Reviews from "./pages/Branch/Components/Reviews.jsx";
import Messages from "./pages/Branch/Components/Messages.jsx";
import Stations from "./pages/Branch/Components/Stations.jsx";
import BranchAuthentication from "./pages/Authentication/BranchAuthentication.jsx";
import { useNavigate } from 'react-router';
import Cookies from "universal-cookie";

const App = () => {
  const cookie = new Cookies();

  const navigate = useNavigate();

  const [userType, setUserType] = useState(cookie.get('user_type'));
  const location = useLocation();

  return (
    <div className="app lexend-text">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authentication />}></Route>
        <Route path="/branchAuth" element={<BranchAuthentication />}></Route>
        <Route path="/stations" element={<Stations />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/userstation" element={<UserStation />} />
        <Route path="/userride" element={<UserRide />} />
        <Route path="/userprofile" element={userType === 3 ? <UserProfile /> : <Authentication logout={true} />} />
      </Routes>

      {BranchRoutes.includes(location.pathname) && (
        <div className="d-flex page">
          <SideBar />
          <Routes>
            <Route path="/branch/stations" element={userType === 2 ? <Main /> : <Authentication logout={true} />} />
            <Route path="/branch/rides" element={userType === 2 ? <Rides /> : <Authentication logout={true} />} />
            <Route path="/branch/reviews" element={userType === 2 ? <Reviews /> : <Authentication logout={true} />} />
            <Route path="/branch/messages" element={userType === 2 ? <Messages /> : <Authentication logout={true} />} />
          </Routes>
        </div>
      )}
      {AdminRoutes.includes(location.pathname) && (
        <div className="d-flex page">
          <AdminSideBar />
          <Routes>
            <Route path="/admin/overview" element={userType === 1 ? <Admin /> : <Authentication logout={true} />} />
            <Route path="/admin/branches" element={userType === 1 ? <AdminManagers /> : <Authentication logout={true} />} />
            <Route path="/admin/coinrequests" element={userType === 1 ? <CoinRequests /> : <Authentication logout={true} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
