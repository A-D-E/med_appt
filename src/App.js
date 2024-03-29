import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProfileForm from './Components/ProfileCard/ProfileCard';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/SignUp/Sign_Up';
import Login from './Components/Login/Login';
import Notification from './Components/Notification/Notification';
import FindDoctorSearch from './Components/InstantConsultation/FindDoctorSearch/FindDoctorSearch';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation'
import ReportsLayout from './Components/ReportsLayout/ReportsLayout'

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Notification>
                    <Routes>
                        <Route path="/" element={<Landing_Page />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Sign_Up />} />
                        <Route path='/search/doctors' element={<FindDoctorSearch />} />
                        <Route path='/instant-consultation' element={<InstantConsultation />} />
                        <Route path="/profile" element={<ProfileForm />} />
                        <Route path='/reports' element={<ReportsLayout />} />
                    </Routes>
                </Notification>
            </BrowserRouter>
        </div>
    );
}

export default App;