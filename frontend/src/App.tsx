import Welcome from "./pages/Welcome"
import {Routes, Route, } from "react-router-dom"
import Signin from "./pages/Signin"
import SignUp from "./pages/SignUp"

function App() {


  return (
    <>

    
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/Signin" element={  <Signin/>}/>
        <Route path="/Signup" element={  <SignUp/>}/>
      </Routes>

    </>
  )
}

export default App
