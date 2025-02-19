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
      <div className="flex">
        {/* {!isLoginPage && <Sidebar2 />} */}
        <div className="flex-1 h-screen bg-black-100 overflow-hidden">{children}</div>
      </div>
    );
  };
  return (
    <>
    <Router>
      <div className="App bg-slate-500">
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

            {/* <Route
              path="/labtestlist"
              element={
                <ProtectedRoute
                  element={<LabTestList />}
                  allowedRole="lab_admin"
                />
              }
            /> */}
            {/* <Route
              path="/addtest"
              element={
                <ProtectedRoute element={<AddTest />} allowedRole="lab_admin" />
              }
            /> */}
            {/* <Route
              path="/addpackages"
              element={
                <ProtectedRoute
                  element={<AddPackages />}
                  allowedRole="lab_admin"
                />
              }
            /> */}
            {/* <Route
              path="/PackageList"
              element={
                <ProtectedRoute
                  element={<PackageList />}
                  allowedRole="lab_admin"
                />
              }
            /> */}
           
            
            
           
           
           
          </Routes>
        </Layout>
      </div>
    </Router>
     
    </>
  );
}

export default App;
