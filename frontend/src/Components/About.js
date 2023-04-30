import React from 'react'; 
import { useEffect } from 'react'; 
import "../Styles/About.css"; 
import github from "../Images/github.png"; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import daisy from "../Images/daisy.jpg"; 
import emmanuel from "../Images/emmanuel.jpg"; 
import andyg from "../Images/andyg.jpg"; 
import thomas from "../Images/thomas.JPG"; 
import { TiStarFullOutline } from "react-icons/ti"; 
import { FaUtensilSpoon } from "react-icons/fa"; 

function About()
{
    useEffect(() => {
        AOS.init({duration : 2000});
        document.title = 'About';
    }, []);

    return(
        <div className='container d-flex align-items-center justify-content-center' id="teamWrapper">
            <div id="teamTitle">
                The Breakfast Club
            </div>

            <div id= "teamSubtitle">Inspired by Letterboxd <FaUtensilSpoon id="subtitleIcon" /> Check out the GitHub!</div>

            <a href="https://github.com/andyjgelfo/CerealBoxd"><img src={github} id="github"></img></a>

            <div id="teamContainer" data-aos="fade">
                <div id="teamCard">
                    <center><img src={daisy} id="teamPhoto" /></center>
                    <center><span id="teamName"><TiStarFullOutline id="teamIcon" />Cap'n Daisy<TiStarFullOutline id="teamIcon" /><br/></span></center>
                    <center><span id="teamRole">Web Frontend<br /></span></center>
                    <center><span id="teamFavorite">Favorite Cereal: Raisin Bran</span></center>
                </div>
                <div id="teamCard">
                    <center><span id="teamName"><TiStarFullOutline id="teamIcon" />Cap'n Arnav<TiStarFullOutline id="teamIcon" /><br/></span></center>
                    <center><span id="teamRole">Web Frontend<br /></span></center>
                    <center><span id="teamFavorite">Favorite Cereal: Cocoa Pebbles</span></center>
                </div>
                <div id="teamCard">
                    <center><img src={thomas} id="teamPhoto" /></center>
                    <center><span id="teamName"><TiStarFullOutline id="teamIcon" />Cap'n Thomas<TiStarFullOutline id="teamIcon" /><br/></span></center>
                    <center><span id="teamRole">API<br /></span></center>
                    <center><span id="teamFavorite">Favorite Cereal: Honey Nut Cheerios</span></center>
                </div>
                <div id="teamCard">
                    <center><img src={emmanuel} id="teamPhoto" /></center>
                    <center><span id="teamName"><TiStarFullOutline id="teamIcon" />Cap'n Emmanuel<TiStarFullOutline id="teamIcon" /><br/></span></center>
                    <center><span id="teamRole">Database<br /></span></center>
                    <center><span id="teamFavorite">Favorite Cereal: Frosted Flakes</span></center>
                </div>
                <div id="teamCard">
                    <center><span id="teamName"><TiStarFullOutline id="teamIcon" />Cap'n Andy A<TiStarFullOutline id="teamIcon" /><br/></span></center>
                    <center><span id="teamRole">Mobile Frontend<br /></span></center>
                    <center><span id="teamFavorite">Favorite Cereal: Reese's Puffs</span></center>
                </div>
                <div id="teamCard">
                    <center><img src={andyg} id="teamPhoto" /></center>
                    <center><span id="teamName"><TiStarFullOutline id="teamIcon" />Cap'n Andy G<TiStarFullOutline id="teamIcon" /><br/></span></center>
                    <center><span id="teamRole">Mobile Frontend<br /></span></center>
                    <center><span id="teamFavorite">Favorite Cereal: Honey Kix</span></center>
                </div>
                <div id="teamCard">
                    <center><span id="teamName"><TiStarFullOutline id="teamIcon" />Cap'n Evan<TiStarFullOutline id="teamIcon" /><br/></span></center>
                    <center><span id="teamRole">Project Manager & Mobile Frontend<br /></span></center>
                    <center><span id="teamFavorite">Favorite Cereal: Cinnamon Toast Crunch</span></center>
                </div>
            </div>
        </div>
    );
};

export default About;