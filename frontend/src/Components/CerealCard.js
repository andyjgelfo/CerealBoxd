import React from 'react'; 
import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react'; 
import "../Styles/CerealCard.css"; 
import { VscHeartFilled } from "react-icons/vsc"; 
import { BsFillStarFill } from "react-icons/bs"; 

const CerealCard = (_) => {
    // Obtains the ID of the cereal 
    const { _id } = useParams();

    const [info, setInfo] = useState([]); 
    let infoData; 

    const [nutrition, setNutrition] = useState([]); 
    let nutritionData; 

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

    useEffect(() => {
        (async () => {
            var obj = {collection:"nutrition",column:"cerealID",target:_id};
            var js = JSON.stringify(obj); 

            try {
                const response = await fetch(bp.buildPath('api/searchByID'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                nutritionData = JSON.parse(await response.text()); 

            } catch (error) {
                nutritionData = []; 
            }

            setNutrition(nutritionData.results); 
        })(); 
    }, []); 

    const [rating, setRating] = useState(null); 
    const [hover, setHover] = useState(null); 

    return(
        <div className='container d-flex align-items-center justify-content-center' id="wrapperCerealCard">
            <div id="imageContainer">
                <img id="image" src={info.image}></img> 
                <div id="likeArea">
                    <span id="likeLabel">Like</span>
                    <button id="likeButton">
                        <VscHeartFilled />
                    </button>   
                </div>    

                <span id="rateLabel">Rate</span>
                <div id="rateArea">
                    {[...Array(5)].map((star,i) => {
                        const ratingValue = i + 1; 
                        return (
                            <label>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                />
                                <BsFillStarFill
                                    className="star"
                                    color={ratingValue <= (hover || rating) ? "#40bcf4" : "#ffffff"}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        ); 
                    })}
                </div>   
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



