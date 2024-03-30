import "./styles/utilities.css"
import "./styles/colors.css"

import Authentication from "./pages/Authentication";
import Main from "./pages/Branch/index.jsx";
import Rides from "./pages/Branch/Components/Rides.jsx";
import NavBar from "./pages/Navbar/index.jsx";
import BranchRoutes from "./core/routes/BranchRoutes.jsx";
import UserRoutes from "./core/routes/UserRoutes.jsx";
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SideBar from "./pages/Branch/Components/SideBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stations from "./pages/Branch/Components/Stations.jsx";

const App = () => {
  const location = useLocation();

  const useEffect = ({
    // auth check
    // get the user info
  }, []);

  return (
    <div className="app">
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
        <Route path="/stations" element={<Stations />} />
        <Route path="/rides" element={<Rides />} />
      </Routes>
      
      {BranchRoutes.includes(location.pathname) && (
        <div className="d-flex page">
            <SideBar />
            <Routes>
              <Route path="/branch/stations" element={<Main />} />
              <Route path="/branch/rides" element={<Rides />} />
              {/* <Route path="/branch/reviews" element={<Reviews />} />
                  <Route path="/branch/messages" element={<Messages />} /> */}
            </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
