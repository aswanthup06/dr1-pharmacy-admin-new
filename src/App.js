import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Mainadmin from "./pages/Mainadmin/Mainadmin/Mainadmin";
import Login from "./pages/Mainadmin/Loginadmin/Login";
import Billing from "./pages/Mainadmin/Billing/Billing";

function App() {
  const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.userType : null;
  };

  const ProtectedRoute = ({ element, allowedRole }) => {
    const userType = isAuthenticated();
    if (!userType) {
      return <Navigate to="/login" replace />;
    }
    if (userType !== allowedRole) {
      return <Navigate to="/unauthorized" replace />;
    }
    return element;
  };
  const Layout = ({ children }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
      <div className="fle">
        {/* {!isLoginPage && <Sidebar2 />} */}
        <div className=" h-screen">{children}</div>
      </div>
    );
  };
  return (
    <>
      <Router>
        <div className="App bg-slate-100 w-full">
          {/* <Start /> */}
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/unauthorized" element={<div>Unauthorized</div>} />

              <Route
                path="/mainadmin"
                element={
                  <ProtectedRoute
                    element={<Mainadmin />}
                    allowedRole="pharmacy_admin"
                  />
                }
              />

              <Route
                path="/billing"
                element={
                  <ProtectedRoute
                    element={<Billing />}
                    allowedRole="pharmacy_admin"
                  />
                }
              />
            </Routes>
          </Layout>
        </div>
      </Router>
    </>
  );
}

export default App;
