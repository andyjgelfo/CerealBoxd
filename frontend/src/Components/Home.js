import React from 'react'; 
import { useEffect } from 'react'; 

function Home()
{
    useEffect(() => {
        document.title = 'Cerealboxd';
    }, []);

    return(
        <div>
            <h1>Home</h1>
        </div>
    );

};

export default Home;