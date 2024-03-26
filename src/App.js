import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sing_Up from './Components/SignUp/Sing_Up';
import Login from './Components/Login/Login';
function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Landing_Page />}/>
              <Route path="/Login" element={<Login />}/>
              <Route path="/SignUp" element={<Sing_Up />}/>
            </Routes>
        </BrowserRouter>
       
    </div>
  );
}

export default App;