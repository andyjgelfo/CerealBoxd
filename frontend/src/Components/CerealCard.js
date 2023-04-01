import React from 'react'; 
import "../Styles/CerealCard.css"; 

const CerealCard = ({ cerealData }) => {
    return (
        <div className="card">
           <img src={cerealData.image}/>
        </div>
    ); 
}; 


export default CerealCard; 