import React from 'react';
import "../Styles/Cereals.css"; 
import { useState, useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"; 
// import { HiPlusCircle } from "react-icons/hi"; 
import AOS from 'aos';
import 'aos/dist/aos.css';

function Cereals()
{
    // Title of webpage
    useEffect(() => {
        AOS.init({duration : 2000});
        document.title = 'Cereals';
    }, []);

    const [allCereals, setAllCereals] = useState([]); 
    const [cereal, setCereal] = useState([]); 

    let cerealData; 

    // const app_name = 'cerealboxd'
    // function buildPath(route, type)
    // {
    //     if (process.env.NODE_ENV === 'production') 
    //     {
    //         return 'https://' + app_name +  '.herokuapp.com/' + route;
    //     }
    //     else
    //     {        
    //         // return 'http://127.0.0.1:6000/' + route;
    //         if (type === 0)
    //             return 'http://localhost:5050/' + route;
    //         else
    //             return 'http://localhost:3000/' + route;
    //     }
    // }
    var bp = require('./Path.js');

    useEffect(() => {
        (async () => {
            var obj = {collection:"box",column:"name",target:''};
            var js = JSON.stringify(obj); 

            try {
                const response = await fetch(bp.buildPath('api/search'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                cerealData = JSON.parse(await response.text()); 

            } catch (error) {
                cerealData = []; 
            }

            setAllCereals(cerealData.results); 
            setCereal(cerealData.results); 
        })(); 
    }, []); 

    const filterCards = event => {
        const value = event.target.value.toLowerCase(); 
        const filteredCereals = allCereals.filter(cereal => (`${cereal.name}`.toLowerCase().includes(value))); 
        setCereal(filteredCereals); 
    }; 

    const tokenResponse = JSON.parse(localStorage.getItem('user_data'));

    var sillyMessage = '';
    if (JSON.stringify(tokenResponse) === "null")
        sillyMessage = "Silly rabbit, you're not signed in!"
    else
        sillyMessage = "Silly rabbit, Cerealboxd is for " + tokenResponse.id + "!";


    return(
        <div className='container d-flex align-items-center justify-content-center' id="wrapper">
            <div className="title">
                {sillyMessage}
            </div>

            <div className="search" data-aos="fade">
                 <input type="text" id="searchBar" placeholder="SEARCH CEREALS..." onInput={filterCards} />
                {/* <button id="newCerealButton" onClick={handleClick}>
                    <HiPlusCircle />
                </button> */}
            </div>

            {/* <div style={{display: isShown ? 'block' : 'none'}}>
                <div>Some content here</div>
            </div> */}

            <div id="cardContainer">
                {cereal.map(cereal2 => {
                    return (
                        <Link 
                        to={{
                        pathname: `/CerealDetails/${cereal2._id}`, 
                        }}>
                            <div id="card" data-aos="flip-right">
                                <img src={cereal2.image}/>
                            </div>
                        </Link>
                    ); 
                })}
            </div>
        </div>
    );
}

export default Cereals;

  


