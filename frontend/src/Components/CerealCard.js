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
import { BsEmojiSmile } from "react-icons/bs"; 
import { FaTimes } from "react-icons/fa"; 
import { MdNotifications } from "react-icons/md"; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Modal from 'react-modal'; 
import { FaUtensilSpoon } from 'react-icons/fa'; 

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
    const [fHover, setfHover] = useState(null);  

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

    // Checking to see if a review was left previously or not 
    const [reviewLeft, setReviewLeft] = useState(null); 
    useEffect(() => {
        (async () => {
            const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
            var idReviewer = tokenResponse.id;

            var obj = {collection:"reviews", column1:"cerealID", column2:"reviewerID", target1:_id, target2:idReviewer};
            var js = JSON.stringify(obj); 
            
            const response = await fetch(bp.buildPath('api/searchByTwoID'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let response1 = JSON.parse(await response.text()).results;

            setReviewLeft(response1);
        })(); 
    }, []); 

    // Used to help check to see if a review was left previously by the user 
    const [leftRating, setLeftRating] = useState(''); 

    // Adds or edits the review data and sends to the database
    const handleAddOrEdit = async event => {
        event.preventDefault();   

        // User is not logged in 
        if (JSON.parse(localStorage.getItem('user_data') == null))
        {
            setModalIsOpenToTrue(); 
        }

        // User is logged in 
        else
        {
            // Review was not left previously: ADD 
            if (reviewLeft == null)
            {
                const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
                var idReviewer = tokenResponse.id;

                var ratingScore = rating; 

                let date1 = new Date().toLocaleDateString();
                let date2 = new Date(date1);
                let dateArray = date2.toDateString().split(' ');
                let dateFormat = dateArray[1] + ' ' + dateArray[2] + ',' + ' ' + dateArray[3];

                // User forgot to leave a rating before leaving a review 
                if (ratingScore == null)
                {
                    setLeftRating("You forgot to leave a rating above!"); 
                }

                // User left a rating first 
                else 
                {
                    var reviewsContent = event.target.reviewsContent.value; 

                    var obj = {reviewerID:idReviewer, cerealID:_id, rating:ratingScore, body:reviewsContent,dateAdded:dateFormat};
                    var js = JSON.stringify(obj); 

                    await fetch(bp.buildPath('api/addReview'), 
                    {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
                    
                    obj = {cerealID:_id};
                    js = JSON.stringify(obj);

                    await fetch(bp.buildPath('api/updateRating'), 
                    {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
                
                    window.location.reload(false);
                }
            }

            // Review was left previously: EDIT 
            else
            {
                const tokenResponse1 = JSON.parse(localStorage.getItem('user_data'));
                var idReviewer1 = tokenResponse1.id;

                var ratingScore1 = rating; 
                var reviewsContent1 = event.target.reviewsContent.value; 

                let date1 = new Date().toLocaleDateString();
                let date2 = new Date(date1);
                let dateArray = date2.toDateString().split(' ');
                let dateFormat = dateArray[1] + ' ' + dateArray[2] + ',' + ' ' + dateArray[3];

                var obj1 = {reviewerID:idReviewer1, cerealID:_id, rating:ratingScore1, body:reviewsContent1, dateAdded:dateFormat};
                var js1 = JSON.stringify(obj1); 

                await fetch(bp.buildPath('api/editReview'), 
                {method:'POST', body:js1, headers:{'Content-Type': 'application/json'}}); 

                obj1 = {cerealID:_id};
                js1 = JSON.stringify(obj1);
                await fetch(bp.buildPath('api/updateRating'), 
                    {method:'POST', body:js1, headers:{'Content-Type': 'application/json'}});
            
                window.location.reload(false);
            }
        }
    }

    // Deleting reviews from the database
    const handleDelete = async event => {
        event.preventDefault(); 

        // User is not logged in 
        if (JSON.parse(localStorage.getItem('user_data') == null))
        {
            setModalIsOpenToTrue(); 
        }

        // User is logged in 
        else
        {
            // Review was not left previously: SURPRISE 
            if (reviewLeft == null)
            {
                window.location.href = "https://www.capncrunchbday.com";
            }

            // Review was left previously: DELETE 
            else
            {
                const tokenResponse1 = JSON.parse(localStorage.getItem('user_data'));
                var idReviewer1 = tokenResponse1.id;

                var obj1 = {reviewerID:idReviewer1, cerealID:_id};
                var js1 = JSON.stringify(obj1); 

                await fetch(bp.buildPath('api/deleteReview'), 
                {method:'POST', body:js1, headers:{'Content-Type': 'application/json'}}); 

                obj1 = {cerealID:_id};
                js1 = JSON.stringify(obj1);

                await fetch(bp.buildPath('api/updateRating'), 
                {method:'POST', body:js1, headers:{'Content-Type': 'application/json'}});
            
                window.location.reload(false);
            }
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

    // Checking to see if cereal has been favorited
    const [favoritedLeft, setFavoritedLeft] = useState(null); 
    useEffect(() => {
        (async () => {
            const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
            var idReviewer = tokenResponse.id;

            var obj = {collection:"favorites", column1:"cerealID", column2:"userID", target1:_id, target2:idReviewer};
            var js = JSON.stringify(obj); 
            
            const response = await fetch(bp.buildPath('api/searchByTwoID'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let response1 = JSON.parse(await response.text()).results;

            if (response1 == null)
                setFavoritedLeft(false)
            else
                setFavoritedLeft(true)



        })(); 
    }, []); 
 
    // Like Cereal
    const handleLike = async event => {
        event.preventDefault();   


        if (JSON.parse(localStorage.getItem('user_data') == null))
        {
            setModalIsOpenToTrue(); 
        }

        else
        {
            const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
            var idReviewer = tokenResponse.id;

            var obj = {userID:idReviewer, cerealID:_id};
            var js = JSON.stringify(obj); 

            if (favoritedLeft == false)
            {
                await fetch(bp.buildPath('api/addFavorite'), 
                {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}); 
            }
            else
            {
                await fetch(bp.buildPath('api/deleteFavorite'), 
                {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}); 
            }
            window.location.reload(false);
        }

    }

    var labelChange = ""; 
    var buttonChange = ""; 
    var valueChange = ""; 
    var deleteChange = " ";
    const [posts, setPosts] = useState(null); 
    const [posts2, setPosts2] = useState(null); 
    const [posts3, setPosts3] = useState(null); 
    const [deleteBtn, setDeleteBtn] = useState(null); 

    // used to keep stars colored once a user changes pages and goes back
    const [reviewLeftScore, setReviewLeftScore] = useState(0);

    // Dynamic add/edit buttons, dynamic text area 
    useEffect(() => {
        (async () => {

        // User is not logged in
        if (JSON.parse(localStorage.getItem('user_data') == null))
        {
            buttonChange = "ADD"; 
            labelChange = "ADD A REVIEW..."; 
            deleteChange = <BsEmojiSmile id="deleteIcon"/>; 

            setPosts(buttonChange); 
            setPosts2(labelChange); 
            setDeleteBtn(deleteChange); 
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
                labelChange = "ADD A REVIEW...";  
                deleteChange = <BsEmojiSmile id="deleteIcon"/>; 
            }
            // User did leave a review previously
            else 
            {
                buttonChange = "EDIT"; 
                labelChange = "EDIT YOUR REVIEW..."; 
                valueChange = response1.body; 
                deleteChange = "DELETE"; 
                // alert(response1.rating)
                setReviewLeftScore(response1.rating);

            }
            setPosts(buttonChange);
            setPosts2(labelChange); 
            setPosts3(valueChange); 
            setDeleteBtn(deleteChange); 
        }
        }
            )(); 
    }, []); 


    // Modal: Pop-up message for requesting a new cereal
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true); 
        document.body.style.overflow = 'hidden';
    }
    
    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false); 
        document.body.style.overflow = 'unset';
    }

    const modalStyles = {
        content : {
          top: '28%',
          left: '50%',
          right: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor:'#F2EAC1' , 
          borderStyle: 'solid', 
          borderColor: '#1C2143',
          borderWidth: '0.6em',
          borderRadius: '32px',
          width: '50em',
          height: 'max-content',
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyItems: 'center', 
          flexDirection: 'column',
          paddingLeft: '4em', 
          paddingRight: '4em',
          paddingTop: '4em', 
          paddingBottom: '4em',
          textAlign: 'center',  
        }
    };

    // User has to be logged in to like a cereal 
    const restrictLikeClick = () => {
        // User is not logged in 
        if (JSON.parse(localStorage.getItem('user_data') == null))
        {
            setModalIsOpenToTrue(); 
        }
     }

    // User has to be logged in to leave a rating on a cereal 
    const restrictStarsClick = () => {
        // User is not logged in 
        if (JSON.parse(localStorage.getItem('user_data') == null))
        {
            setModalIsOpenToTrue(); 
        }
    }

    return(
        <div className='container d-flex align-items-center justify-content-center' id="wrapperCerealCard">
                {/* Image, Like Button, Rate Buttons */}
                <div id="imageContainer" data-aos="flip-right">
                    <img id="image" src={info.image}></img> 
                    <div id="likeArea" onClick={restrictLikeClick}>
                        <span id="likeLabel">Like</span>
                        <button id="likeButton" onClick={handleLike}>
                            <VscHeartFilled id="heart"
                                color={(fHover || favoritedLeft) ? "#C41E3A": "#ffffff"}
                                onMouseEnter={() => setfHover(true)}
                                onMouseLeave={() => setfHover(null)}
                            />
                        </button>   
                    </div>    
                    <span id="rateLabel">Rate</span>

                    <div id="rateArea" onClick={restrictStarsClick}>
                        {[...Array(5)].map((star,i) => {
                            const ratingValue = i + 1; 
                            return (
                                <label>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        id="stars"
                                        onClick={() => setRating(ratingValue)}
                                    />
                                    <BsFillStarFill
                                        className="star"
                                        color={ratingValue <= (hover || rating || reviewLeftScore) ? "#40bcf4" : "#ffffff"}
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
                    <span id="willItKillYou1">Calculated based on the amount of added sugars and serving size.</span>
                    <span id="willItKillYou2">{info.willItKillYou} / 10</span>
                </div>
            
            
                <div id="reviewsContainer" className='container d-flex align-items-center justify-content-center'>
                    <span id="reviewsTitle"><RiStarSmileLine id="reviewsIcon"/> REVIEWS <RiStarSmileLine id="reviewsIcon"/></span>
                        <div id="leftRatingMessage">
                            {leftRating}
                        </div>
                        <br />
                        <form id="reviewsForm" onSubmit={handleAddOrEdit}>
                            <textarea id="reviewsContent" placeholder={posts2} defaultValue={posts3} class="reviewsBody" rows={4} cols={60} />
                            <br />
                            <div id="buttonsArea">
                                <button type="submit" id="reviewsButton">{posts}</button>
                                <button id="deleteButton" onClick={handleDelete}>{deleteBtn}</button>
                            </div>
                        </form>
                </div>

            {/* Displays  all users' reviews  */}
            <div id="everyonesReviews" className='container d-flex align-items-center justify-content-center'>
                {reviewReview.map(reviewReview2 => {
                    return(
                        <div id="reviewCard" data-aos="fade">
                            <span id="firstLineReviewCard1">@{reviewReview2.reviewerName}</span>
                            <span id="firstLineReviewCard2">{reviewReview2.rating}/5 Stars <FaUtensilSpoon /> {reviewReview2.dateAdded}</span>
                            <br />
                            <span id="bodyReviewCard">{reviewReview2.body}</span>
                            <hr id="horizontalLine"/>
                        </div>
                    );
                })}
            </div>

            {/* Modal: user has to be logged in to add a review or see the surprise */}
            {!localStorage.getItem('user_data') && 
            (<Modal style={modalStyles} isOpen={modalIsOpen} onRequestClose={setModalIsOpenToFalse}>
                <center><span id="modalAddReviewTitle"><MdNotifications id="modalAddReviewIcon"/> No Milk Before Cereal <MdNotifications id="modalAddReviewIcon"/></span></center>
                <br />
                <center><span id="modalAddReviewSubtitle"><a id="login" href="/LoginPage">Login</a> or <a id="register" href="/RegisterPage">register</a> for an account in order to use this feature!</span></center>
                <button id="modalAddReviewClose" onClick={setModalIsOpenToFalse}>
                    <FaTimes id="modalAddReviewCloseIcon" />
                </button>
            </Modal>)}
        </div>
    ); 
}; 

export default CerealCard; 