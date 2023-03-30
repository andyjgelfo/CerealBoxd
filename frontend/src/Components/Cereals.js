import React from 'react';
import "../Styles/Cereals.css"; 
import { useState, useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import CerealCard from '../Components/CerealCard'; 

function Cereals()
{
    // Title of webpage
    useEffect(() => {
        document.title = 'Cereals';
    }, []);

    //const [allUsers, setAllUsers] = useState([]); 
    const [cereal, setCereal] = useState([]); 

    let cerealData; 

    const app_name = 'cerealboxd'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:6000/' + route;
        }
    }

    useEffect(() => {
        (async () => {
            var obj = {collection:"box",column:"name",target:''};
            var js = JSON.stringify(obj); 

            try {
                const response = await fetch(buildPath('api/search'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                cerealData = JSON.parse(await response.text()); 

                //setCereal(cerealData); 

                //cerealData = await response.json(); 

            } catch (error) {
                cerealData = []; 
            }

            //setAllUsers(userData.results); 
            setCereal(cerealData.results); 
        })(); 
    }, []); 

    // const filterCards = event => {
    //     const value = event.target.value.toLowerCase(); 
    //     const filteredUsers = allUsers.filter(user => (`${user.name.first} ${user.name.last}`.toLowerCase().includes(value))); 
    //     setUsers(filteredUsers); 
    // }; 

    return(
        <div className='container d-flex align-items-center justify-content-center' id="wrapper">
             <div className="title">
                 Silly rabbit, you're not signed in!
             </div>

            <input className="searchBar" placeholder="SEARCH..." /*onInput={filterCards}*/ />
     
            <div className="cardContainer">
                {cereal.map((box, index) => (
                    <CerealCard cerealData={box} key={index}/>
                ))}
            </div>
        </div>
    );
};

export default Cereals;