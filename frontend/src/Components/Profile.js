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
        if (window.confirm("Are you sure you want to delete this account?"))
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

    // Obtains the user's details to load up into the input fields 
    const [userDetails, setUserDetails] = useState([]); 
    let userHi; 
    useEffect(() => {
        (async () => {
            var obj = {collection:"user",column:"_id",target:userid};
            var js = JSON.stringify(obj); 
    
            try {
                const response = await fetch(bp.buildPath('api/searchByID'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
                userHi = JSON.parse(await response.text()); 

                setUserDetails(userHi.results); 
            } catch (error) {
                userHi = []; 
            }
            })(); 
    }, []); 

    let profileFirstName;
    let profileLastName;
    let profileUsername;
    let profilePassword; 
    let profileEmail;
    let profileRecoveryEmail; 
    const [message,setMessage] = useState('');

    // Edits the user's details
    const handleEditUser = async event => {
        event.preventDefault();   

        

        obj = {username:profileUsername.value}
        js = JSON.stringify(obj)
        let response = await fetch(bp.buildPath('api/checkUsername'), 
        {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}); 
        let dupe = JSON.parse(await response.text());

        // if dupe and also if not the current users username
        if (dupe.results === 1 && profileUsername.value != thisUser)
        {
            setMessage("Username is already taken, please choose a different one");
        }
        else
        {

            var obj = {_id:userid,fName:profileFirstName.value,lName:profileLastName.value,userName:profileUsername.value,
                password:profilePassword.value,email:profileEmail.value,recoveryEmail:profileRecoveryEmail.value};
            var js = JSON.stringify(obj); 
    
            await fetch(bp.buildPath('api/editUser'), 
                {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}); 

            var user = {firstName:profileFirstName.value,lastName:profileLastName.value,username:profileUsername.value, id:userid}
            localStorage.setItem('user_data', JSON.stringify(user));
                
            window.location.reload(false);   
        }
    }

    return(
        <div>
            {/* Welcome Message  */}
            <div className='Info'>
                <div class='InfoText'>
                    Welcome To {thisUser}'s Box!
                </div>
            </div>

            <div className='TabBox' data-aos="fade">
                <Tabs
                    defaultActiveKey="favorites"
                    id="uncontrolled-tab-example"
                    >
                    <Tab eventKey="favorites" title="FAVORITES" className="tester">
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
                                })}; 
                            </div>
                        </div>
                    </Tab>

                    <Tab eventKey="review" title="REVIEWS">
                        <div className="Reviews">
                            {review.map(review2 => {
                                return(
                                    <div id="reviewCardPage">
                                        <Link id="profileReviewTitle"
                                            to={{
                                            pathname:`/CerealDetails/${review2.cerealID}`, 
                                            }}>
                                            <div>{review2.cerealName}</div>
                                        </Link>
                                        <span id="bodyReviewCard">{review2.body}</span>
                                        <hr id="horizontalLine"/>
                                    </div>
                                );
                            })}
                        </div>
                    </Tab>

                    <Tab eventKey="contact" title="EDIT PROFILE">
                        <div className="textArea">
                            <span id="editResult">{message}</span><br/>
                            <span class="profileLabels">First Name</span><br />
                            <input type="text" class="profileInput" id="profileFirstName" placeholder="First Name" defaultValue={userDetails.fName} ref={(c) => profileFirstName =c}/><br />
                            <span class="profileLabels">Last Name</span><br />
                            <input type="text" class="profileInput" id="profileLastName" placeholder="Last Name" defaultValue={userDetails.lName} ref={(c) => profileLastName =c}/><br />
                            <span class="profileLabels">Username</span><br />
                            <input type="text" class="profileInput" id="profileUsername" placeholder="Username" defaultValue={userDetails.userName} ref={(c) => profileUsername =c}/><br />
                            <span class="profileLabels">Email</span><br />
                            <input type="text" class="profileInput" id="profileEmail" placeholder="Email" defaultValue={userDetails.email} ref={(c) => profileEmail =c}/><br />
                            <span class="profileLabels">Recovery Email</span><br />
                            <input type="text" class="profileInput" id="profileRecoveryEmail" placeholder="Recovery Email" defaultValue={userDetails.recoveryEmail} ref={(c) => profileRecoveryEmail =c}/><br />
                            <span class="profileLabels">Password</span><br />
                            <input type="password" class="profileInput" id="profilePassword" placeholder="Password" defaultValue={userDetails.password} ref={(c) => profilePassword =c}/><br />
                            <button id="saveProfileButton" onClick={handleEditUser}>SAVE</button>
                            <button id="deleteProfileButton" onClick={deleteAccount}>DELETE ACCOUNT</button> 
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );

};

export default Profile;

