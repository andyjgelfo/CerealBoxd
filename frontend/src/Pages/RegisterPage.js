import React from 'react'; 
import Register from '../Components/Register'; 
import Navbar from "../Components/Navbar"; 

const RegisterPage = () =>
{
    return (
        <div className="page">
            <Navbar />
            <Register />
        </div>
    ); 
}; 

export default RegisterPage;

