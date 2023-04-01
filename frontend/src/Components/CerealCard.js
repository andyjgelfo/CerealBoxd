import React from 'react'; 
import "../Styles/CerealCard.css"; 

const CerealCard = ({ cerealData }) => {
    return (
        <div className="card">
            <div className="card_title">{cerealData.image}</div>
        </div>
    ); 
}; 

export default CerealCard; 