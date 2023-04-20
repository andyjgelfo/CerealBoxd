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

    const [allCereals, setAllCereals] = useState([]); 
    const [cereal, setCereal] = useState([]); 
    const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
    let userid = tokenResponse.id;
    // alert(userid);
    let cerealData; 

    var bp = require('./Path.js');

    useEffect(() => {
        (async () => {
            // alert(userid)
            var obj = {target:userid};
            var js = JSON.stringify(obj); 

            try {
                const response = await fetch(bp.buildPath('api/getFav'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                cerealData = JSON.parse(await response.text()); 
                // alert(JSON.stringify(cerealData.results));

            } catch (error) {
                cerealData = []; 
            }

            setAllCereals(cerealData.results); 
            setCereal(cerealData.results); 
        })(); 
    }, []); 


    return(
        <div>
            <div className='Info'>
                blah
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
                    <Tab eventKey="profile" title="Profile">
                        <div className="textArea">Test test</div>
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

