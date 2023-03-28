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
            <img src={require('../Images/BannerFade.jpg')} alt='banner' className="banner"/>
           <section class="articles">
            <article>
                <div class="article-wrapper">
                    <figure>
                        <img src="https://picsum.photos/id/1011/800/450" alt="" />
                    </figure>
                    <div class="article-body">
                        <h2>Top 10 Cereals For A Rainy Day</h2>
                        <p>
                        Enter Description Here.
                        </p>
                        <a href="#" class="read-more">
                        Read more <span class="sr-only">...</span>
                        </a>
                    </div>
                </div>
            </article>

            <article>
                <div class="article-wrapper">
                    <figure>
                        <img src="https://picsum.photos/id/1005/800/450" alt="" />
                    </figure>
                    <div class="article-body">
                        <h2>Editor's Choice: Raisin Bran</h2>
                        <p>
                        Enter some description here.
                        </p>
                        <a href="#" class="read-more">
                        Read more <span class="sr-only">...</span>
                        </a>
                    </div>
                </div>
            </article>

            <article>
                <div class="article-wrapper">
                    <figure>
                        <img src="https://picsum.photos/id/103/800/450" alt="" />
                    </figure>
                    <div class="article-body">
                        <h2>Top 5 Low-Sugar Cereals</h2>
                        <p>
                        Some description here!!
                        </p>
                        <a href="#" class="read-more">
                        Read more <span class="sr-only">...</span>
                        </a>
                    </div>
                </div>
            </article>
            </section>
        </div>
           
        
    );

};



export default Home;

