import React from 'react'; 
import { useEffect } from 'react'; 

function About()
{
    useEffect(() => {
        document.title = 'About';
    }, []);

    const aboot = localStorage.getItem('user_data');
    alert(aboot);

    return(
        <div>
            <h1>About</h1>
        </div>
    );

};

export default About;