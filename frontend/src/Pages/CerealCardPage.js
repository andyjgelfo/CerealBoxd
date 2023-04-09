import React from 'react'; 
import Navbar from "../Components/Navbar"; 
import CerealCard from "../Components/CerealCard";

const CerealCardPage = () =>
{
    return (
        <div className="page">
            <Navbar />
            <CerealCard />
        </div>
    ); 
}; 

export default CerealCardPage;
