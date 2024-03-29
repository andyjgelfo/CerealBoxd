// This is essentially the home page. 

import React, { Component } from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; 
import Home from "./Components/Home"; 
import About from "./Components/About"; 
import Cereals from "./Components/Cereals"; 
import Login from "./Components/Login/Login"; 
import Register from "./Components/Register"; 
import CerealCard from "./Components/CerealCard";
import Profile from "./Components/Profile";
import Confirm from "./Components/Confirm";
import ForgotPassword from "./Components/ForgotPass";

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" index element={<React.Fragment><Navbar /><Home /></React.Fragment>} />
            <Route path="/AboutPage" index element = {<React.Fragment><Navbar /><About /></React.Fragment>}/>
            <Route path="/CerealsPage" index element = {<React.Fragment><Navbar /><Cereals /></React.Fragment>}/>
            <Route path="/LoginPage" index element={<React.Fragment><Navbar /><Login /></React.Fragment>} />
            <Route path="/RegisterPage" index element = {<React.Fragment><Navbar /><Register /></React.Fragment>}/>
            <Route path="/CerealDetails/:_id" element={<React.Fragment><Navbar /><CerealCard /></React.Fragment>}/>
            <Route path="/HomePage" index element = {<React.Fragment><Navbar /><Home /></React.Fragment>}/>
            <Route path="/ProfilePage" index element = {<React.Fragment><Navbar /><Profile /></React.Fragment>}/>
            <Route path="/ConfirmEmail" index element = {<React.Fragment><Navbar /><Confirm /></React.Fragment>}/>
            <Route path="/ForgotPass" index element = {<React.Fragment><Navbar /><ForgotPassword /></React.Fragment>}/>
          </Routes>
        </div>
      </BrowserRouter>
    ); 
  }
}

export default App; 
