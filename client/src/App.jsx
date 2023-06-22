import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Homepage from "scenes/homePage/Homepage";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/ProfilePage";

function App() {

  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/home" element={<Homepage />} /> 
        <Route path="/profile/:userId" element={<ProfilePage />} /> 
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
