import React from 'react'; 
import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react'; 
import "../Styles/CerealCard.css"; 
import { VscHeartFilled } from "react-icons/vsc"; 
import { BsFillStarFill } from "react-icons/bs"; 
import { MdMenuBook } from "react-icons/md"; 
import { BsSpeedometer2 } from "react-icons/bs"; 
import { BsStars } from "react-icons/bs"; 
import { IoMdNutrition } from "react-icons/io"; 

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
                <span id="subtitle">Produced by {info.manufacturer}</span>
                <span id="description">{info.description}</span>
                <span id="ratingLabel"><BsStars id="ratingIcon"/> Overall Rating <BsStars id="ratingIcon"/></span>
                <span id="rating">{info.rating} / 5</span>
                <span id="ingredientsLabel"><MdMenuBook id="ingredientsIcon"/> Ingredients <MdMenuBook id="ingredientsIcon"/></span>
                <span id="ingredients">{info.ingredients}</span>

                <span id="nutritionLabel"><IoMdNutrition id="nutritionIcon"/> Nutrition Facts <IoMdNutrition id="nutritionIcon"/></span>
                <span class="nutritionFacts">Serving Size: {nutrition.servingSize} g</span>
                <span class="nutritionFacts">Calories: {nutrition.calories}</span>
                <span class="nutritionFacts">Total Fat: {nutrition.totalFat} g</span>
                <span class="nutritionFacts">Saturated Fat: {nutrition.saturatedFat} g</span>
                <span class="nutritionFacts">Trans Fat: {nutrition.transFat} g</span>
                <span class="nutritionFacts">Polyunsaturated Fat: {nutrition.polyunsaturatedFat} g</span>
                <span class="nutritionFacts">Monounsaturated Fat: {nutrition.monounsaturatedFat} g</span>
                <span class="nutritionFacts">Cholesterol: {nutrition.cholesterol} mg</span>
                <span class="nutritionFacts">Sodium: {nutrition.sodium} mg</span>
                <span class="nutritionFacts">Total Carbohydrate: {nutrition.totalCarbohydrate} g</span>
                <span class="nutritionFacts">Dietary Fiber: {nutrition.dietaryFiber} g</span>
                <span class="nutritionFacts">Total Sugars: {nutrition.totalSugars} g</span>
                <span class="nutritionFacts">Added Sugars: {nutrition.addedSugars} g</span>
                <span class="nutritionFacts">Protein: {nutrition.protein} g</span>
                <span class="nutritionFacts">Vitamin D: {nutrition.vitaminD}</span>
                <span class="nutritionFacts">Calcium: {nutrition.calcium}</span>
                <span class="nutritionFacts">Iron: {nutrition.iron}</span>
                <span class="nutritionFacts">Potassium: {nutrition.potassium}</span>
                <span class="nutritionFacts">Vitamin C: {nutrition.vitaminC}</span>
                <span class="nutritionFacts">Thiamin: {nutrition.thiamin}</span>
                <span class="nutritionFacts">Riboflavin: {nutrition.riboflavin}</span>
                <span class="nutritionFacts">Niacin: {nutrition.niacin}</span>
                <span class="nutritionFacts">Phosphorus: {nutrition.phosphorus}</span>
                <span class="nutritionFacts">Magnesium: {nutrition.magnesium}</span>
                <span class="nutritionFacts">Zinc: {nutrition.zinc}</span>
                <span class="nutritionFacts">Selenium: {nutrition.selenium}</span>
                <span class="nutritionFacts">Copper: {nutrition.copper}</span>
                <span class="nutritionFacts">Manganese: {nutrition.manganese}</span>
                <span class="nutritionFacts">Vitamin B6: {nutrition.vitaminB6}</span>
                <span class="nutritionFacts">Folate: {nutrition.folate}</span>
                <span class="nutritionFacts">Vitamin B12: {nutrition.vitaminB12}</span>

                <span id="willItKillYouLabel"><BsSpeedometer2 id="killIcon"/> Will It Kill You Meter <BsSpeedometer2 id="killIcon"/></span>
                <span id="willItKillYou">{info.willItKillYou}</span>
            </div>
        </div>
    ); 
}; 

export default CerealCard; 



