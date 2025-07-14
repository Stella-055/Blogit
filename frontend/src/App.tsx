import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Posts from "./components/Posts";
import Createblog from "./components/Createblog";
import Profile from "./components/Profile";
import Protected from "./components/Protected";
import Blogdetails from "./pages/Blogdetails";
import Settings from "./components/Settings";
import Updateblog from "./components/Updateblog";
import Forgotpas from "./pages/Forgotpas";
import Otp from "./pages/Otp";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/forgot/password" element={<Forgotpas />} />
        <Route path="/forgot/password/otp" element={<Otp />} />
        <Route
          path="/dashboard/:id"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        >
          <Route
            path="Blogs"
            element={
              <Protected>
                <Posts />
              </Protected>
            }
          />
          <Route
            path="Createblog"
            element={
              <Protected>
                <Createblog />
              </Protected>
            }
          />
          <Route
            path="Profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="settings"
            element={
              <Protected>
                <Settings />
              </Protected>
            }
          />
          <Route
            path="userblogdetails/:id"
            element={
              <Protected>
                <Updateblog />
              </Protected>
            }
          />
          <Route
            path="blogdetails/:id"
            element={
              <Protected>
                <Blogdetails />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
