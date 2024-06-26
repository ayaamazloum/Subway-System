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
import { useLocation } from "react-router-dom";
import SideBar from "./pages/Branch/Components/SideBar.jsx";
import AdminSideBar from "./pages/Admin/Components/SideBar.jsx";
import Admin from "./pages/Admin/index.jsx";
import AdminManagers from "./pages/Admin/Components/Managers.jsx";
import AdminStations from "./pages/Admin/Components/Stations.jsx";
import CoinRequests from "./pages/Admin/Components/CoinRequests.jsx";
import Reviews from "./pages/Branch/Components/Reviews.jsx";
import Messages from "./pages/Branch/Components/Messages.jsx";
import Stations from "./pages/Branch/Components/Stations.jsx";
import BranchAuthentication from "./pages/Authentication/BranchAuthentication.jsx";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const cookie = new Cookies();
  const location = useLocation();

  return (
    <div className="app lexend-text white-bg">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            cookie.get("user_type") == 3 || cookie.get("user_type") == null ? (
              <Home />
            ) : (
              <Authentication logout={true} />
            )
          }
        />
        <Route
          path="/auth"
          element={
            cookie.get("user_type") == null ? (
              <Authentication logout={false} />
            ) : (
              <Authentication logout={true} />
            )
          }
        ></Route>
        <Route
          path="/branchAuth"
          element={
            cookie.get("user_type") == null ? (
              <BranchAuthentication />
            ) : (
              <Authentication logout={true} />
            )
          }
        ></Route>
        <Route
          path="/stations"
          element={
            cookie.get("user_type") == 3 || cookie.get("user_type") == null ? (
              <Stations />
            ) : (
              <Authentication logout={true} />
            )
          }
        />
        <Route
          path="/rides"
          element={
            cookie.get("user_type") == 3 || cookie.get("user_type") == null ? (
              <UserRide />
            ) : (
              <Authentication logout={true} />
            )
          }
        />
        <Route
          path="/userstations"
          element={
            cookie.get("user_type") == 3 || cookie.get("user_type") == null ? (
              <UserStation />
            ) : (
              <Authentication logout={true} />
            )
          }
        />
        <Route
          path="/userride"
          element={
            cookie.get("user_type") == 3 || cookie.get("user_type") == null ? (
              <UserRide />
            ) : (
              <Authentication logout={true} />
            )
          }
        />
        <Route
          path="/userprofile"
          element={
            cookie.get("user_type") == 3 ? (
              <UserProfile />
            ) : (
              <Authentication logout={true} />
            )
          }
        />
      </Routes>

      {BranchRoutes.includes(location.pathname) && (
        <div className="d-flex page branch-page">
          <SideBar />
          <Routes>
            <Route
              path="/branch/stations"
              element={
                cookie.get("user_type") == 2 ? (
                  <Main />
                ) : (
                  <Authentication logout={true} />
                )
              }
            />
            <Route
              path="/branch/rides"
              element={
                cookie.get("user_type") == 2 ? (
                  <Rides />
                ) : (
                  <Authentication logout={true} />
                )
              }
            />
            <Route
              path="/branch/reviews"
              element={
                cookie.get("user_type") == 2 ? (
                  <Reviews />
                ) : (
                  <Authentication logout={true} />
                )
              }
            />
            <Route
              path="/branch/messages"
              element={
                cookie.get("user_type") == 2 ? (
                  <Messages />
                ) : (
                  <Authentication logout={true} />
                )
              }
            />
          </Routes>
        </div>
      )}
      {AdminRoutes.includes(location.pathname) && (
        <div className="d-flex page admin-page">
          <AdminSideBar />
          <Routes>
            <Route
              path="/admin/overview"
              element={
                cookie.get("user_type") == 1 ? (
                  <Admin />
                ) : (
                  <Authentication logout={true} />
                )
              }
            />
            <Route
              path="/admin/branches"
              element={
                cookie.get("user_type") == 1 ? (
                  <AdminManagers />
                ) : (
                  <Authentication logout={true} />
                )
              }
            />
            <Route
              path="/admin/stations"
              element={
                cookie.get("user_type") == 1 ? (
                  <AdminStations />
                ) : (
                  <Authentication logout={true} />
                )
              }
            />
            <Route
              path="/admin/coinrequests"
              element={
                cookie.get("user_type") == 1 ? (
                  <CoinRequests />
                ) : (
                  <Authentication logout={true} />
                )
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
