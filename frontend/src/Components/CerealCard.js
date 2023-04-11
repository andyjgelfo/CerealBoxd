import React from 'react'; 
import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react'; 
import "../Styles/CerealCard.css"; 

const CerealCard = (_) => {
    // Obtains the ID of the cereal 
    const { _id } = useParams();

    const [info, setInfo] = useState([]); 
    let infoData; 

    var bp = require('./Path.js');
    
    useEffect(() => {
        (async () => {
            var obj = {collection:"box",column:"_id",target:_id};
            var js = JSON.stringify(obj); 

            try {
                const response = await fetch(bp.buildPath('api/searchByID'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                infoData = JSON.parse(await response.text()); 

            } catch (error) {
                infoData = []; 
            }

            setInfo(infoData.results); 
        })(); 
    }, []); 

    return(
        <div className='container d-flex align-items-center justify-content-center' id="wrapperCerealCard">
            <div id="imageContainer">
                <img id="image" src={info.image}></img>
            </div>

            <div id="infoContainer">
                <span id="name">{info.name}</span>
                <span id="subtitle">{info.releaseDate}  |  Produced by {info.manufacturer}</span>
                <span id="description">{info.description}</span>
                <span id="ingredientsLabel">Ingredients</span>
                <span id="ingredients">{info.ingredients}</span>
                <span id="willItKillYouLabel">Will It Kill You? Meter</span>
                <span id="willItKillYou">{info.willItKillYou}</span>
                <span id="ratingLabel">Overall Rating</span>
                <span id="rating">{info.rating}</span>
            </div>
        </div>
    ); 
}; 

export default CerealCard; 



