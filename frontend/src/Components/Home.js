import React from 'react'; 
import { useEffect } from 'react';
import "../Styles/Home.css"; 
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home()
{
    useEffect(() => {
        AOS.init({duration : 2000});
        document.title = 'Cerealboxd';
    }, []);

    return(
        <div> 
            <div class = "BannerNButton">
                <img src={require('../Images/BannerFade2Text.png')} alt='banner' className="banner"/>
                <a href="LoginPage">
                    <button class = "logBut">LOGIN</button>
                </a>
                <a href="RegisterPage">
                    <button class = "regBut">REGISTER</button>
                </a>
            </div>
            <h1 data-aos = "fade-up">Featured Articles</h1>
            <br></br>

           <section data-aos = "fade-up" class="articles">
                <article>
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/SadCereal.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>Top 10 Cereals For A Rainy Day</h2>
                            <p>Enter Description Here.</p>
                            <center><a href="#" class="read-more">Read More</a></center>
                        </div>
                    </div>
                </article>

                <article>
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/RaisinBran.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>Editor's Choice: Raisin Bran</h2>
                            <p>Enter Description Here.</p>
                            <center><a href="#" class="read-more">Read More</a></center>
                        </div>
                    </div>
                </article>

                <article>
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/SugarFree.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>Top 5 Low-Sugar Cereals</h2>
                            <p>Enter Description Here.</p>
                            <center><a href="#" class="read-more">Read More</a></center>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default Home;

