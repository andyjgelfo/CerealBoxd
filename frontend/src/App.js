// This is essentially the home page. 

import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; 
import Home from "./Components/Home"; 
import About from "./Components/About"; 
import Cereals from "./Components/Cereals"; 
import Login from "./Components/Login"; 
import Register from "./Components/Register"; 

function App() {
  return(
    <BrowserRouter>
      <Routes>
       <Route path="/" index element={<React.Fragment><Navbar /><Home /></React.Fragment>} />
       <Route path="/AboutPage" index element = {<React.Fragment><Navbar /><About /></React.Fragment>}/>
       <Route path="/CerealsPage" index element = {<React.Fragment><Navbar /><Cereals /></React.Fragment>}/>
       <Route path="/LoginPage" index element={<React.Fragment><Navbar /><Login /></React.Fragment>} />
       <Route path="/RegisterPage" index element = {<React.Fragment><Navbar /><Register /></React.Fragment>}/>
       <Route path="/InfoPage" index element = {<React.Fragment><Navbar /><Info /></React.Fragment>}/>
      </Routes>
    </BrowserRouter>
  ); 
}

export default App; 
