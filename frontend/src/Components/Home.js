import React from 'react'; 
import { useEffect } from 'react';
import "../Styles/Home.css"; 
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

function Home()
{
    useEffect(() => {
        document.title = 'Cerealboxd';
    }, []);

    useEffect(() => {
        AOS.init({duration: 2000});
        AOS.refreshHard(); 
    }, []);

    return(
        <div>
            <img src={require('../Images/BannerFade2Text.png')} alt='banner' className="banner"/>
            <h1 data-aos="flip-left">Featured Articles</h1>
            <br />
            
           <section class="articles">

                <article data-aos="fade-down" data-aos-once="false">
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/SadCereal.png')} className="cards" />
                        </figure>

                        <div class="article-body">
                            <h2>Top 10 Cereals For A Rainy Day</h2>
                            <p>
                                Enter some description here.
                            </p>
                            <center><a href="#"><span class="read-more">READ MORE</span></a></center>
                        </div>
                    </div>
                </article>

                <article data-aos="fade-down" data-aos-once="false">
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/RaisinBran.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>Editor's Choice: Raisin Bran</h2>
                            <p>
                                Enter some description here.
                            </p>
                            <center><a href="#"><span class="read-more">READ MORE</span></a></center>
                        </div>
                    </div>
                </article>

                <article data-aos="fade-down" data-aos-once="false">
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/SugarFree.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>Top 5 Low-Sugar Cereals</h2>
                            <p>
                                Enter some description here. 
                            </p>
                            <center><a href="#"><span class="read-more">READ MORE</span></a></center>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default Home;

