import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Branch/index.jsx";
import Rides from "./pages/Branch/Components/Rides.jsx";
import BranchRoutes from "./core/BranchRoutes.jsx";
import { useLocation } from "react-router-dom";
import SideBar from "./pages/Branch/Components/SideBar.jsx";
const App = () => {
  const location = useLocation();
  return (
    <>
      <div className="d-flex page">
        {BranchRoutes.includes(location.pathname) && (
          <>
            <SideBar />
            <Routes>
              <Route path="/branch/stations" element={<Main />} />
              <Route path="/branch/rides" element={<Rides />} />
              {/* <Route path="/branch/reviews" element={<Reviews />} />
                  <Route path="/branch/messages" element={<Messages />} /> */}
            </Routes>
          </>
        )}
      </div>
    </>
  );
};

export default App;
