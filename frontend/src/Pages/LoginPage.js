import React from 'react'; 
import Login from '../Components/Login'; 
import Navbar from "./Components/Navbar"; 
import "../Styles/Login.css"; 

const LoginPage = () =>
{
    return (
        <div className="page">
            <Navbar />
            <Login />
        </div>
    ); 
}; 

export default LoginPage; 