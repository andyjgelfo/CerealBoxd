import React from 'react'; 
import { useEffect } from 'react'; 

function About()
{
    useEffect(() => {
        document.title = 'About';
    }, []);

    const aboot = JSON.parse(localStorage.getItem('user_data'));
    alert("Welcome " + aboot.id);

    return(
        <div>
            <h1>About</h1>
        </div>
    );
    

};

export default About;