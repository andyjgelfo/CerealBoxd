import React from 'react'; 
import { useEffect } from 'react'; 

function About()
{
    useEffect(() => {
        document.title = 'About';
    }, []);


    // const tokenResponse = JSON.parse(localStorage.getItem('user_data'));

    // if (JSON.stringify(tokenResponse) === "null")
    //     alert("Welcome unnamed"); 
    // else
    //     alert("Welcome " + tokenResponse.id);


    return(
        <div>
            <h1>About</h1>
        </div>
    );
    

};

export default About;