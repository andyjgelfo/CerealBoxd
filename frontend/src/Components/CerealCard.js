import React from 'react'; 
import "../Styles/CerealCard.css"; 

const CerealCard = ({ cerealData }) => {
    return (
        <div className="card">
            <div className="card_title">{cerealData.name}</div>
        </div>
    ); 
}; 

export default CerealCard; 