import React from 'react'; 
import { useEffect, useState } from 'react';
import "../Styles/Home.css"; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom"; 
import { BsTrophyFill } from "react-icons/bs"; 
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"; 

function Home()
{
    useEffect(() => {
        AOS.init({duration : 2000});
        document.title = 'Cerealboxd';
    }, []);

    var bp = require('./Path.js');

    const [random, setRandom] = useState([]); 
    let randomCereal; 

    // Obtains the cereal of the day 
    useEffect(() => {
        (async () => {
            var obj = {collection:"box"};
            var js = JSON.stringify(obj); 

            try {
                const response = await fetch(bp.buildPath('api/getRandom'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                randomCereal = JSON.parse(await response.text()); 

                setRandom(randomCereal.result); 

            } catch (error) {
                randomCereal = []; 
            }
        })(); 
    }, []); 

    const [top5, setTop5] = useState([]); 
    let top5Cereals;  
    let sortData; 

    // Obtains the top 5 cereals rated on Cerealboxd
    useEffect(() => {
        (async () => {
            var obj = {collection:"box",column:"rating",order:-1};
            var js = JSON.stringify(obj); 

            try {
                const response = await fetch(bp.buildPath('api/sort'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                top5Cereals = JSON.parse(await response.text()); 

                sortData = top5Cereals.results.splice(0, 5); 

                setTop5(sortData); 
            } catch (error) {
                top5Cereals = []; 
            }

        })(); 
    }, []);  

    return(
        <div> 
            <div data-aos="zoom-in" className='container d-flex align-items-center justify-content-center'  id="homeContainer">
                <div id="homeSubtitle">
                    A Cereal-ously Powerful<br />Breakfast Site.
                </div>
            </div>

            <h1 data-aos="fade-up">Featured Content</h1>
            <br />

           <section data-aos = "fade-up" class="articles">
                {/* <article>
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/SadCereal.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>Cereals For A Rainy Day</h2>
                            <center><a href="#" class="read-more">Read More</a></center>
                        </div>
                    </div>
                </article> */}

                {/* <article>
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/RaisinBran.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>Editor's Choice: Raisin Bran</h2>
                            <center><a href="#" class="read-more">Read More</a></center>
                        </div>
                    </div>
                </article> */}

                {/* <article>
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/SugarFree.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>Low-Sugar Cereals</h2>
                            <center><a href="#" class="read-more">Read More</a></center>
                        </div>
                    </div>
                </article> */}

                {/* Cereal of the Day */}
                <article>
                    <div class="article-wrapper" id="cerealOfTheDayRedirect">
                        <center><span id="cerealOfTheDayTitle"><GiPerspectiveDiceSixFacesRandom id="articleIcons" /> Random Cereal Generator <GiPerspectiveDiceSixFacesRandom id="articleIcons" /></span></center>
                        <br />
                        <figure>
                            <img src={random.image} className="cards" />
                        </figure>
                        <div class="article-body">
                            <Link 
                            to={{
                            pathname: `/CerealDetails/${random._id}`, 
                            }}>
                                <center><span id="cerealOfTheDay">{random.name}</span></center>
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Current Top 5 Rated Cereals */}
                <article>
                    <div class="article-wrapper">
                        <div class="article-body">
                            <center><span id="currentTop5Title"><BsTrophyFill id="articleIcons" /> Current Top 5 Rated Cereals <BsTrophyFill id="articleIcons" /></span><br /></center>
                            {top5.map((topFive, index) => {
                                const indexTracker = index + 1; 
                                return (
                                    <Link 
                                    to={{
                                    pathname: `/CerealDetails/${topFive._id}`, 
                                    }}>
                                        <p>{index + 1}. {topFive.name}</p>
                                    </Link>
                                ); 
                            })}
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default Home;

