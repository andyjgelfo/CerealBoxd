import React from 'react'; 
import { useEffect } from 'react'; 

function Cereals()
{
    useEffect(() => {
        document.title = 'Cereals';
    }, []);

    return(
        <div>
            <h1>Cereals</h1>
        </div>
    );
};

export default Cereals;