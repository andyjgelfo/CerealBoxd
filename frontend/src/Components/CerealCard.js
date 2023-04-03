import React from 'react'; 
import "../Styles/CerealCard.css";
import { Link } from 'react-router-dom'; 

const CerealCard = ({ cerealData }) => {
    return (
        <Link to={'/InfoPage'}>
            <div className="card">
            <img src={cerealData.image}/>
            </div>
        </Link>
    ); 
}; 

export default CerealCard; 



