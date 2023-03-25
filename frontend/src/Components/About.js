import React from 'react'; 
import { useEffect } from 'react'; 

function About()
{
    useEffect(() => {
        document.title = 'About';
    }, []);

    return(
        <div>
            <h1>It worked!</h1>
        </div>
    );

};

export default About;