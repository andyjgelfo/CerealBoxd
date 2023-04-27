import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"; 
import { useState, useEffect } from 'react'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../Styles/Profile.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



function Profile()
{
    useEffect(() => {
        AOS.init({duration : 2000});
        document.title = 'Cerealboxd';
    }, []);
    
    //Favorites data
    const [allCereals, setAllCereals] = useState([]); 
    const [cereal, setCereal] = useState([]); 

    //Review Data
    const [review, setReview] = useState([]);

    const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
    let userid = tokenResponse.id;
    let thisUser = tokenResponse.username;
    // alert(userid);
    let cerealData;
    let reviewData;

    var bp = require('./Path.js');

    useEffect(() => {
        (async () => {
            //For cereals
            var obj = {target:userid};
            var js = JSON.stringify(obj);

            //For reviews
            var obj2 = {collection:"reviews",column:"reviewerID",target:userid};
            var js2 = JSON.stringify(obj2);

            try {
                //Gather favorites data
                const response = await fetch(bp.buildPath('api/getFav'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                cerealData = JSON.parse(await response.text()); 

                //Gathering review data
                const response2 = await fetch(bp.buildPath('api/searchByIDmulti'),
                {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

                reviewData = JSON.parse(await response2.text());

            } catch (error) {
                cerealData = [];
                reviewData = [];
            }

            setAllCereals(cerealData.results); 
            setCereal(cerealData.results);
            setReview(reviewData.results);
        })(); 
    }, []); 

    const deleteAccount = async event => 
    {
        if (window.confirm("Are you sure you want to delete your account? This action is irreversable uwu!!"))
        {
            // starts by deleting all favorites
            var obj = {collection:"favorites",column:"userID",target:userid};
            var js = JSON.stringify(obj);

            var response = await fetch(bp.buildPath('api/searchByIDmulti'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            const favorites = (JSON.parse(await response.text()).results);
            for (let i = 0; i < favorites.length; i++)
            {
                // alert(favorites[i]._id)
                obj = {collection:"favorites",_id:favorites[i]._id};
                js = JSON.stringify(obj);
                await fetch(bp.buildPath('api/remove'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            }

            // deleting all reviews
            obj = {collection:"reviews",column:"reviewerID",target:userid};
            js = JSON.stringify(obj);

            response = await fetch(bp.buildPath('api/searchByIDmulti'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            const reviews = (JSON.parse(await response.text()).results);
            for (let i = 0; i < reviews.length; i++)
            {
                // alert(reviews[i].cerealName)
                obj = {collection:"reviews",_id:reviews[i]._id};
                js = JSON.stringify(obj);
                await fetch(bp.buildPath('api/remove'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                // updates rating on cereals
                obj = {cerealID:reviews[i].cerealID};
                js = JSON.stringify(obj);

                    await fetch(bp.buildPath('api/updateRating'), 
                    {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            }

            // finally deletes user
            obj = {collection:"user",_id:userid};
            js = JSON.stringify(obj);
            await fetch(bp.buildPath('api/remove'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            localStorage.clear(); 
            window.location.href = '/HomePage';
        }


    }


    return(
        <div>
            <div className='Info'>
                <div class='InfoText'>
                    {thisUser}'s Box!
                </div>
                <button class = "EditUser">Edit User</button>
                <button class = "RecoveryEmail">Recovery Email</button>
                <button class = "DeleteAcc" onClick={deleteAccount}>Delete Account</button>
            </div>
            <div className='TabBox'>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    >
                    <Tab eventKey="home" title="Favorites" className="tester">
                        <div className="Favorites">
                            <div id="cardContainer">
                                {cereal.map(cereal2 => {
                                    return (
                                        <Link  
                                            to={{
                                            pathname:`/CerealDetails/${cereal2._id}`, 
                                            }}>
                                            <div id="card" data-aos="flip-right">
                                                <img src={cereal2.image}/>
                                            </div>
                                        </Link>
                                    ); 
                                })}
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="review" title="Reviews">
                        <div className="Reviews">
                            {review.map(review2 => {
                                return(
                                    <div id="reviewCardPage">
                                        <Link class = "Link"
                                            to={{
                                            pathname:`/CerealDetails/${review2.cerealID}`, 
                                            }}>
                                            <div>{review2.cerealName}</div>
                                        </Link>
                                        <span id="bodyReviewCard">{review2.body}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </Tab>
                    <Tab eventKey="contact" title="Contact">
                        <div className="textArea">Hi Thomas</div>
                    </Tab>
                </Tabs>
            </div>

        </div>
        
    );

};



export default Profile;

