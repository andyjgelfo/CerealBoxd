import React from 'react'; 
import { useEffect } from 'react';
import "../Styles/Home.css"; 

function Home()
{
    useEffect(() => {
        document.title = 'Cerealboxd';
    }, []);

    return(
        <div>
            <img src={require('../Images/BannerFade2Text.png')} alt='banner' className="banner"/>
            <h1>Featured Articles</h1>
            <br></br>
            <hr></hr>
           <section class="articles">
                <article>
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/SadCereal.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>&nbsp;Top 10 Cereals For A Rainy &nbsp;Day</h2>
                            <p>
                            &nbsp;Enter Description Here.
                            </p>
                            <a href="#" class="read-more">
                            &nbsp;Read more <span class="sr-only">...</span>
                            </a>
                        </div>
                    </div>
                </article>

                <article>
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/RaisinBran.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>&nbsp;Editor's Choice: Raisin Bran</h2>
                            <p>
                            &nbsp;Enter some description here.
                            </p>
                            <a href="#" class="read-more">
                            &nbsp;Read more <span class="sr-only">...</span>
                            </a>
                        </div>
                    </div>
                </article>

                <article>
                    <div class="article-wrapper">
                        <figure>
                            <img src={require('../Images/SugarFree.png')} className="cards" />
                        </figure>
                        <div class="article-body">
                            <h2>&nbsp;Top 5 Low-Sugar Cereals</h2>
                            <p>
                            &nbsp;Some description here!!
                            </p>
                            <a href="#" class="read-more">
                            &nbsp;Read more <span class="sr-only">...</span>
                            </a>
                        </div>
                    </div>
                </article>
            </section>
        </div>
           
        
    );

};




export default Home;

