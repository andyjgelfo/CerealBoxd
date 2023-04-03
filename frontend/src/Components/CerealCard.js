import React from 'react'; 
import "../Styles/CerealCard.css";

const CerealCard = ({ cerealData }) => {
    return (
        <a href="InfoPage">
            <div className="card">
            <img src={cerealData.image}/>
            </div>
        </a>
    ); 
}; 

export default CerealCard; 



