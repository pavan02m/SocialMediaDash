import "./App.css";
import ForgotPasswordForm from "./pages/forgotPassword";
import Login from "./pages/login.js";
import Register from "./pages/register";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner";
import PublicRoute from "./components/publicRoute.js";
import ProtectedRoute from "./components/protectedRoute.js";
import SidebarWithHeader from "./components/Navbar.js";
import Home from "./pages/Home.js";
import ConnectAccountPage from "./pages/ConnectAccountPage";
import UserData from "./pages/UserData";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <Router>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <ConnectAccountPage />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                // <ProtectedRoute>
                <SidebarWithHeader>
                  <Home />
                </SidebarWithHeader>
                // </ProtectedRoute>
              }
            />
            <Route
              path="/getUserData"
              element={
                // <ProtectedRoute>
                <SidebarWithHeader>
                  <UserData />
                </SidebarWithHeader>
                // </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPasswordForm />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
