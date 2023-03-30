import React from 'react'; 
import Navbar from "../Components/Navbar"; 
import Cereals from "../Components/Cereals";

const CerealsPage = () =>
{
    return (
        <div className="page">
            <Navbar />
            <Cereals />
        </div>
    ); 
}; 

export default CerealsPage;
