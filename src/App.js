import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/SignUp/Sign_Up';
import Login from './Components/Login/Login';
import Notification from './Components/Notification/Notification';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Notification>
                <Routes>
                <Route path="/" element={<Landing_Page />}/>
                <Route path="/Login" element={<Login />}/>
                <Route path="/SignUp" element={<Sign_Up />}/>
                <Route path='/finddoctor' element={<FindDoctorSearch />} />
                </Routes>
            </Notification>
        </BrowserRouter>
    </div>
  );
}

export default App;