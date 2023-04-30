import React from 'react';
import "../Styles/Cereals.css"; 
import { useState, useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Modal from 'react-modal'; 
import { MdNotifications } from "react-icons/md"; 
import { BsFillBrightnessAltHighFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa"; 
import { Container, Button} from 'react-floating-action-button'; 
import emailjs from '@emailjs/browser';

function Cereals()
{
    // Title of webpage
    useEffect(() => {
        AOS.init({duration : 2000});
        document.title = 'Cereals';
    }, []);

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

    // Obtains the cereal data from the database and sorts them in ascending order
    const [sortCereals, setSortCereals] = useState([]); 
    const [allCereals, setAllCereals] = useState([]); 
    let sortData; 
    useEffect(() => {
        (async () => {
            var obj = {collection:"box",column:"name",order:1};
            var js = JSON.stringify(obj); 

            try {
                const response = await fetch(bp.buildPath('api/sort'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                sortData = JSON.parse(await response.text()); 

            } catch (error) {
                sortData = []; 
            }

            setAllCereals(sortData.results); 
            setSortCereals(sortData.results); 
        })(); 
    }, []); 

    // Function for the search bar
    const filterCards = event => {
        const value = event.target.value.toLowerCase(); 
        const filteredCereals = allCereals.filter(sortCereals => (`${sortCereals.name}`.toLowerCase().includes(value))); 
        setSortCereals(filteredCereals); 
    }; 

    const tokenResponse = JSON.parse(localStorage.getItem('user_data'));

    var sillyMessage = '';
    if (JSON.stringify(tokenResponse) === "null")
        sillyMessage = "Silly Rabbit, You're Not Signed In!"
    else
        sillyMessage = "Silly Rabbit, Cerealboxd Is For @" + tokenResponse.username + "!";

    
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

    const customStyles1 = {
        content : {
          top: '52%',
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

    const customStyles2 = {
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

    // get api keys for emailJS
    const [serviceID, setService] = useState(null); 
    const [templateID, setTemplate] = useState(null); 
    const [publicKey, setPublicKey] = useState(null); 
    useEffect(() => {
        (async () => {
        var res = await fetch(bp.buildPath('api/getKeys'), 
            {method:'POST', body:'{}', headers:{'Content-Type': 'application/json'}});

        var keys = JSON.parse(await res.text()); 
        setService(keys.results.YOUR_SERVICE_ID);
        setTemplate(keys.results.YOUR_TEMPLATE_ID);
        setPublicKey(keys.results.YOUR_PUBLIC_KEY);
        })(); 
    }, []); 

    let suggestCerealName; 
    let suggestManufacturer; 

    // Suggest a new cereal feature
    const sendSuggestion = (event) => {
        event.preventDefault(); 

        var obj = {name: suggestCerealName.value,manufacturer:suggestManufacturer.value};
        var js = JSON.stringify(obj); 

        fetch(bp.buildPath('api/addSuggestion'), 
        {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});

        const tokenResponse = JSON.parse(localStorage.getItem('user_data'));
        const tokenName = tokenResponse.username;
        
        var templateParams = {
            from_name: tokenName,
            cerealName: suggestCerealName.value,
            manufacturer:suggestManufacturer.value
        };
     
        emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        setModalIsOpenToFalse();

    }

    return(
        <div className='container d-flex align-items-center justify-content-center' id="wrapper">
            {/* Title */}
            <div className="title">
                {sillyMessage}
            </div>

            {/* Search bar */}
            <div className="search" data-aos="fade">
                <input type="text" id="searchBar" placeholder="SEARCH..." onInput={filterCards} />
            </div>

            {/* Floating action button: suggest a new cereal */}
            <Container styles={{background:'none', border: 'none', left: '92%', top: '85%',}}>
                <Button styles={{backgroundColor: '#F2EAC1', color:'#1C2143', fontSize: '2.4em', textAlign: 'center', paddingTop: '0.1em', position:'BottomRight'}} onClick={setModalIsOpenToTrue}>+</Button>
            </Container>

            {/* Logged in  */}
            {localStorage.getItem('user_data') && (<Modal style={customStyles1} isOpen={modalIsOpen} onRequestClose={setModalIsOpenToFalse}>
                    <center><span id="modalTitle"><BsFillBrightnessAltHighFill id="modalIcon"/> Suggest A New Cereal <BsFillBrightnessAltHighFill id="modalIcon"/></span></center>
                    <center><span id="modalSubtitle">Don't see your favorite cereal? Want to contribute?</span></center>
                    <center><span id="modalSubtitle">Send in the details below and we'll do our research!</span></center>
                    <br />
                    <br />
                    <center><input type="text" id="suggestCerealName" placeholder='CEREAL NAME' ref={(c) => suggestCerealName = c}/><br /></center>
                    <br />
                    <center><input type="text" id="suggestManufacturer" placeholder='MANUFACTURER' ref={(c) => suggestManufacturer = c}/><br /></center>
                    <br />
                    <br />
                    <center><button id="modalSubmit" onClick={sendSuggestion}>SUBMIT</button></center>
                    <button id="modalClose" onClick={setModalIsOpenToFalse}>
                        <FaTimes id="modalCloseIcon" />
                    </button>
                    <br />
                    <br />
                    {/* <center><span id="modalSubmitSuccess">Submitted successfully!</span></center> */}
            </Modal>)}

            {/* Logged out */}
            {!localStorage.getItem('user_data') && (<Modal style={customStyles2} isOpen={modalIsOpen} onRequestClose={setModalIsOpenToFalse}>
                    <center><span id="modalTitle"><MdNotifications id="modalIcon"/> No Milk Before Cereal <MdNotifications id="modalIcon"/></span></center>
                    <br />
                    <center><span id="modalSubtitle"><a id="login" href="/LoginPage">Login</a> or <a id="register" href="/RegisterPage">register</a> for an account in order to use this feature!</span></center>
                    <button id="modalClose" onClick={setModalIsOpenToFalse}>
                        <FaTimes id="modalCloseIcon" />
                    </button>
            </Modal>)}

            {/* Displays cereal images  */}
            <div id="cardContainer">
                {sortCereals.map(cereal2 => {
                    return (
                        <Link 
                        to={{
                        pathname: `/CerealDetails/${cereal2._id}`, 
                        }}>
                            <div id="card" data-aos="flip-right">
                                <img                               
                                    src={cereal2.image}
                                />
                            </div>
                        </Link>
                    ); 
                })}
            </div>
        </div>
    );
}

export default Cereals;