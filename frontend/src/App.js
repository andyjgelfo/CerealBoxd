// HOME PAGE 


import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; 
import Login from "./Components/Login"; 
import AboutPage from "./Pages/AboutPage";
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  return(
    <BrowserRouter>
      <Routes>
       <Route path="/" index element={<React.Fragment>
      <Navbar />
      <Login />
    </React.Fragment>} />
        <Route path="/AboutPage" index element = {<AboutPage />}/>
        <Route path="/Register" index element = {<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
    // <React.Fragment>
    //   <Navbar />
    //   <Login />
    // </React.Fragment>
  ); 

}

export default App; 
