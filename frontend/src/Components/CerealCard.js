import React from 'react'; 
import { useParams } from "react-router-dom"; 
import { useState, useEffect, useRef } from 'react'; 
import "../Styles/CerealCard.css"; 
import { VscHeartFilled } from "react-icons/vsc"; 
import { BsFillStarFill } from "react-icons/bs"; 
import { MdMenuBook } from "react-icons/md"; 
import { BsSpeedometer2 } from "react-icons/bs"; 
import { BsStars } from "react-icons/bs"; 
import { IoMdNutrition } from "react-icons/io"; 
import { RiStarSmileLine } from "react-icons/ri"; 
import AOS from 'aos';
import 'aos/dist/aos.css';

const CerealCard = (_) => {
    // Obtains the ID of the cereal 
    const { _id } = useParams();

    // For obtaining cereal details 
    const [info, setInfo] = useState([]); 
    let infoData; 

    // For obtaining nutrition facts 
    const [nutrition, setNutrition] = useState([]); 
    let nutritionData; 

    // For the star rating values
    const [rating, setRating] = useState(null); 
    const [hover, setHover] = useState(null);  

    var bp = require('./Path.js');
    
    // Cereal Details 
    useEffect(() => {
        AOS.init({duration : 2000});

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

    // Nutrition Facts
    useEffect(() => {
        (async () => {
            window.scrollTo(0,0); 

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

    // Sends the review data over to the database
    const handleAdd = (event) => {
        event.preventDefault();   

        if (JSON.parse(localStorage.getItem('user_data') == null))
        {
            alert("Login or register for an account in order to add a review!"); 
        }

        else
        {
            const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
            var idReviewer = tokenResponse.id;

            var ratingScore = rating; 
            var reviewsContent = event.target.reviewsContent.value; 

            var obj = {reviewerID:idReviewer, cerealID:_id, rating:ratingScore, body:reviewsContent};
            var js = JSON.stringify(obj); 

            fetch(bp.buildPath('api/addReview'), 
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
        
            event.target.reset();

            window.location.reload(false); 
        }
    }

    // Edits the review data and sends to the database
    const handleEdit = (event) => {
        event.preventDefault();   

        if (JSON.parse(localStorage.getItem('user_data') == null))
        {
            alert("Login or register for an account in order to add a review!"); 
        }

        else
        {
            const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
            var idReviewer = tokenResponse.id;

            var ratingScore = rating; 
            var reviewsContent = event.target.reviewsContent.value; 

            var obj = {reviewerID:idReviewer, cerealID:_id, rating:ratingScore, body:reviewsContent};
            var js = JSON.stringify(obj); 

            fetch(bp.buildPath('api/addReview'), 
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}); 
        
            event.target.reset();

            window.location.reload(false);
        }
    }

    // Text Area Review 
    let textBoxContent; 
    useEffect(() => {
        (async () => {
            const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
            var idReviewer = tokenResponse.id;

            var obj = {collection:"reviews", column1:"cerealID", column2:"reviewerID", target1:_id, target2:idReviewer};
            var js = JSON.stringify(obj); 

            const response = await fetch(bp.buildPath('api/searchByTwoID'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            const middleTextBox = JSON.parse(await response.text()).results; 

            textBoxContent = JSON.stringify(middleTextBox);
        })(); 
    }, []); 

    // Getting everyone's reviews to display together
    const [reviewReview, setReviewReview] = useState([]);  
    useEffect(() => {
        (async () => {
            var obj = {collection:"reviews", column:"cerealID", target:_id};
            var js = JSON.stringify(obj); 

            const response = await fetch(bp.buildPath('api/searchByIDmulti'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let tooManyReviews = JSON.parse(await response.text()).results; 
            setReviewReview(tooManyReviews); 
        })(); 
    }, []); 
 
    // Like Cereal
    const handleLike = (event) => {
        event.preventDefault();   

        if (JSON.parse(localStorage.getItem('user_data') == null))
        {
            alert("Login or register for an account in order to save this to your favorites!"); 
        }

        else
        {
            const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
            var idReviewer = tokenResponse.id;

            var obj = {userID:idReviewer, cerealID:_id};
            var js = JSON.stringify(obj); 

            fetch(bp.buildPath('api/addFavorite'), 
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}); 
        }
    }

    var labelChange = ""; 
    var buttonChange = ""; 
    var valueChange = ""; 
    const [posts, setPosts] = useState(null); 
    const [posts2, setPosts2] = useState(null); 
    const [posts3, setPosts3] = useState(null); 

    useEffect(() => {
        (async () => {
        // User is not logged in
        if (JSON.parse(localStorage.getItem('user_data') == null))
        {
            buttonChange = "ADD"; 
            labelChange = "ADD REVIEW..."; 

            setPosts(buttonChange); 
            setPosts2(labelChange); 
        }
        
        // User is logged in 
        else 
        {
            const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
            var idReviewer = tokenResponse.id;

            var obj = {collection:"reviews", column1:"cerealID", column2:"reviewerID", target1:_id, target2:idReviewer};
            var js = JSON.stringify(obj); 
            
            const response = await fetch(bp.buildPath('api/searchByTwoID'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let response1 = JSON.parse(await response.text()).results; 

            // User didn't leave a review
            if (response1 == null)
            {
                buttonChange = "ADD"; 
                labelChange = "ADD REVIEW...";  
            }
            // User did leave a review previously
            else 
            {
                buttonChange = "EDIT"; 
                labelChange = "EDIT REVIEW..."; 
                valueChange = response1.body; 
            }
            setPosts(buttonChange);
            setPosts2(labelChange); 
            setPosts3(valueChange); 
        }
        }
            )(); 
    }, []); 

    return(
        <div className='container d-flex align-items-center justify-content-center' id="wrapperCerealCard">
                {/* Image, Like Button, Rate Buttons */}
                <div id="imageContainer" data-aos="flip-right">
                    <img id="image" src={info.image}></img> 
                    <div id="likeArea">
                        <span id="likeLabel">Like</span>
                        <button id="likeButton" onClick={handleLike}>
                            <VscHeartFilled id="heart"/>
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
                
                {/* Information  */}
                <div id="infoContainer" data-aos="fade">
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
                    <span class="nutritionFacts">Vitamin D: {(nutrition.vitaminD * 100)}%</span>
                    <span class="nutritionFacts">Calcium: {(nutrition.calcium* 100)}%</span>
                    <span class="nutritionFacts">Iron: {(nutrition.iron * 100)}%</span>
                    <span class="nutritionFacts">Potassium: {(nutrition.potassium* 100)}%</span>
                    <span class="nutritionFacts">Vitamin C: {(nutrition.vitaminC* 100)}%</span>
                    <span class="nutritionFacts">Thiamin: {(nutrition.thiamin* 100)}%</span>
                    <span class="nutritionFacts">Riboflavin: {(nutrition.riboflavin* 100)}%</span>
                    <span class="nutritionFacts">Niacin: {(nutrition.niacin* 100)}%</span>
                    <span class="nutritionFacts">Phosphorus: {(nutrition.phosphorus* 100)}%</span>
                    <span class="nutritionFacts">Magnesium: {(nutrition.magnesium* 100)}%</span>
                    <span class="nutritionFacts">Zinc: {(nutrition.zinc* 100)}%</span>
                    <span class="nutritionFacts">Selenium: {(nutrition.selenium* 100)}%</span>
                    <span class="nutritionFacts">Copper: {(nutrition.copper* 100)}%</span>
                    <span class="nutritionFacts">Manganese: {(nutrition.manganese* 100)}%</span>
                    <span class="nutritionFacts">Vitamin B6: {(nutrition.vitaminB6* 100)}%</span>
                    <span class="nutritionFacts">Folate: {(nutrition.folate* 100)}%</span>
                    <span class="nutritionFacts">Vitamin B12: {(nutrition.vitaminB12* 100)}%</span>
                    <span id="willItKillYouLabel"><BsSpeedometer2 id="killIcon"/> Will It Kill You Meter <BsSpeedometer2 id="killIcon"/></span>
                    <span id="willItKillYou">{info.willItKillYou}</span>
                </div>
            
                <div id="reviewsContainer" className='container d-flex align-items-center justify-content-center'>
                    <span id="reviewsTitle"><RiStarSmileLine id="reviewsIcon"/> REVIEWS <RiStarSmileLine id="reviewsIcon"/></span>
                        <br/>
                        <form id="reviewsForm" onSubmit={handleAdd}>
                            <textarea id="reviewsContent" placeholder={posts2} defaultValue={posts3} class="reviewsBody" rows={4} cols={60} />
                            <br />
                            <button type="submit" id="addButton">{posts}</button>
                        </form>
                </div>

            {/* Displays  all users' reviews  */}
            <div id="everyonesReviews" className='container d-flex align-items-center justify-content-center'>
                {reviewReview.map(reviewReview2 => {
                    return(
                        <div id="reviewCard" data-aos="fade">
                            <span id="firstLineReviewCard1">Rating Given: {reviewReview2.rating}/5</span>
                            <span id="firstLineReviewCard2">@{reviewReview2.reviewerName}</span>
                            <br />
                            <span id="bodyReviewCard">{reviewReview2.body}</span>
                            <hr id="horizontalLine"/>
                        </div>
                    );
                })}
            </div>
        </div>
    ); 
}; 

export default CerealCard; 



