import React from 'react'; 
import Navbar from "../Components/Navbar"; 
import About from "../Components/About";

const HomePage = () =>
{
    return (
        <div className="page">
            <Navbar />
            <About />
        </div>
    ); 
}; 

export default HomePage;
