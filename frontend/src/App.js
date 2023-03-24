// HOME PAGE 


import React from 'react'; 
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; 
import Login from "./Components/Login"; 
import AboutUs from "./Pages/AboutPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" index element = {<LoginPage/>} />
        <Route path = "/AboutUs" index element = {<AboutUs/>}/>
      </Routes>
    </BrowserRouter>
  ); 

}

export default App; 
