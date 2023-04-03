import React from 'react'; 
import { useEffect } from 'react'; 

function Info()
{
    useEffect(() => {
        document.title = 'About';
    }, []);

    return(
        <div>
            <h1>Info</h1>
        </div>
    );

};

export default Info;