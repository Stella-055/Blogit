import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Posts from "./components/Posts";
import Createblog from "./components/Createblog";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />}  >
         <Route path="Blogs" element={<Posts/>}/>
         <Route path="Createblog" element={<Createblog/>}/>
         <Route path="Profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
