import "./styles/utilities.css";
import "./styles/colors.css";

import Authentication from "./pages/Authentication";
import Main from "./pages/Branch/index.jsx";
import Rides from "./pages/Branch/Components/Rides.jsx";
import NavBar from "./pages/Navbar/index.jsx";
import BranchRoutes from "./core/routes/BranchRoutes.jsx";
import AdminRoutes from "./core/routes/AdminRoutes.jsx";
import UserRoutes from "./core/routes/UserRoutes.jsx";
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SideBar from "./pages/Branch/Components/SideBar.jsx";
import AdminSideBar from "./pages/Admin/Components/SideBar.jsx";
import Admin from "./pages/Admin/index.jsx";
import AdminManagers from "./pages/Admin/Components/Managers.jsx";
import Reviews from "./pages/Branch/Components/Reviews.jsx";
import Messages from "./pages/Branch/Components/Messages.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stations from "./pages/Branch/Components/Stations.jsx";
import BranchAuthentication from "./pages/Authentication/BranchAuthentication.jsx";

const App = () => {
  const location = useLocation();

  const useEffect =
    ({
      // auth check
      // get the user info
    },
    []);

  return (
    <div className="app lexend-text">
      {UserRoutes.includes(location.pathname) && (
        <div className="app">
          <Routes>
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authentication />}></Route>
        <Route path="/branchAuth" element={<BranchAuthentication />}></Route>
        <Route path="/stations" element={<Stations />} />
        <Route path="/rides" element={<Rides />} />
      </Routes>

      {BranchRoutes.includes(location.pathname) && (
        <div className="d-flex page">
          <SideBar />
          <Routes>
            <Route path="/branch/stations" element={<Main />} />
            <Route path="/branch/rides" element={<Rides />} />
            <Route path="/branch/reviews" element={<Reviews />} />
            <Route path="/branch/messages" element={<Messages />} />
          </Routes>
        </div>
      )}
      {AdminRoutes.includes(location.pathname) && (
        <div className="d-flex page">
          <AdminSideBar />
          <Routes>
            <Route path="/admin/overview" element={<Admin />} />
            <Route path="/admin/branches" element={<AdminManagers />} />
            <Route path="/admin/coinrequests" element={<Reviews />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
