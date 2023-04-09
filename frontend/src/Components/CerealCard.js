import React from 'react'; 
import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react'; 

const CerealCard = (_) => {
    // Obtains the ID of the cereal 
    const { _id } = useParams();

    const [info, setInfo] = useState([]); 
    let infoData; 

    var bp = require('./Path.js');
    
    useEffect(() => {
        (async () => {
            var obj = {collection:"box",column:"_id",target:_id};
            var js = JSON.stringify(obj); 

            try {
                const response = await fetch(bp.buildPath('api/searchByID'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                infoData = JSON.parse(await response.text()); 

            } catch (error) {
                infoData = []; 
            }

            setInfo(infoData.results); 
        })(); 
    }, []); 

    return(
        <div>
            {info.name}
            {info.manufacturer}
        </div>
    ); 
}; 

export default CerealCard; 



