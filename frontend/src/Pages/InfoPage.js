import React from 'react'; 
import Login from '../Components/Login'; 
import Navbar from "../Components/Navbar"; 

const InfoPage = () =>
{
    return (
        <div className="page">
            <Navbar />
            <Login />
        </div>
    ); 
}; 

export default InfoPage;

