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
        sillyMessage = "Silly rabbit, Cerealboxd is for @" + tokenResponse.username + "!";



    
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
                    <center><span id="modalSubtitle">Don't see your favorite cereal? Thinking outside of the (cereal) box?</span></center>
                    <center><span id="modalSubtitle">Send in the details below and we'll do our research!</span></center>
                    <br />
                    <br />
                    <center><input type="text" id="suggestCerealName" placeholder='CEREAL NAME'/><br /></center>
                    <br />
                    <center><input type="text" id="suggestManufacturer" placeholder='MANUFACTURER'/><br /></center>
                    <br />
                    <br />
                    <center><button id="modalSubmit">SUBMIT</button></center>
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
                    <center><span id="modalSubtitle"><a id="login" href="/LoginPage">Login</a> or <a id="register" href="/RegisterPage">register</a> for an account in order to suggest a cereal to be added!</span></center>
                    <button id="modalClose" onClick={setModalIsOpenToFalse}>
                        <FaTimes id="modalCloseIcon" />
                    </button>
            </Modal>)}

            {/* Displays cereal images  */}
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





  


