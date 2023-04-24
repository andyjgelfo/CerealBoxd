import React, { useState } from 'react';
import "../Styles/Register.css"
import { useEffect } from 'react'; 
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Register()
{
    useEffect(() => {
        AOS.init({duration : 2000});
        document.title = 'Register';
    }, []);

    let user = '';
    let search = '';
    let registerFirstName;
    let registerLastName;
    let registerUsername;
    let registerEmail;
    let registerPassword;
    let registerRetype;

    const [message, setMessage] = useState()

    // const app_name = 'cerealboxd'
    // function buildPath(route, type)
    // {
    //     if (process.env.NODE_ENV === 'production') 
    //     {
    //         return 'https://' + app_name +  '.herokuapp.com/' + route;
    //     }
    //     else
    //     {        
    //         // return 'http://127.0.0.1:6000/' + route;
    //         if (type === 0)
    //             return 'http://localhost:5050/' + route;
    //         else
    //             return 'http://localhost:3000/' + route;
    //     }
    // }

    var bp = require('./Path.js');

    const doRegister = async event => 
    {
        event.preventDefault();

        var obj = {fName:registerFirstName.value,lName:registerLastName.value,userName:registerUsername.value,password:registerPassword.value,email:registerEmail.value};
        var js = JSON.stringify(obj);

        var obj2 = {username:registerUsername.value};
        var js2 = JSON.stringify(obj2);

        try
        {
            if (registerPassword.value !== registerRetype.value)
            {
                throw("Retype Password does not match Password");
            }    

            const res = await fetch (bp.buildPath('api/checkUsername'), 
            {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            var dupe = JSON.parse(await res.text()); 


            if (dupe.results !== 0)
            {
                throw("User with this username already exists");
            }

            var response = await fetch(bp.buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            
            // email start
            obj = {login:registerUsername.value,password:registerPassword.value};
            js = JSON.stringify(obj);
    
            var config = 
            {
                method: 'post',
                url: bp.buildPath('api/login'),	
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                data: js
            };

            axios(config)
            .then(function (response) 
        {
            var storage = require('../tokenStorage.js');
            var res = response.data;
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
   
                var email = ud.payload.email;
                var verified = ud.payload.confirmed
                var id = ud.payload.id;
                var userId = ud.payload.userId;
                
                // alert("email: " + email + ", verified: " + verified + "id: " + id);
                if (verified === false)
                {
                    localStorage.setItem('email', email);
                    localStorage.setItem("id", id);
                    // var user = {firstName:firstName,lastName:lastName,username:userId, id:id}
                    // localStorage.setItem('user_data', JSON.stringify(user));

                
                
                    window.location.href = '/ConfirmEmail';
                }
          
        })
        .catch(function (error) 
        {
            console.log(error);
        });
        // window.location.href = '/LoginPage';

        }
        catch(e)
        {
            setMessage(e.toString());
        }
    
    }

    return (
        <div class='wrapper-register d-flex align-items-center justify-content-center'>
            <div class='container align-items-center justify-content-center' id="registerDiv" data-aos="fade">
                <form onSubmit={doRegister}>
                    <center><span id= "title">REGISTER</span></center>
                    <center><input type="text" id="registerFirstName" placeholder="FIRST NAME" ref={(c) => registerFirstName =c}/><br /></center>
                    <center><input type="text" id="registerLastName" placeholder="LAST NAME" ref={(c) => registerLastName =c}/><br /></center>
                    <center><input type="text" id="registerUsername" placeholder="USERNAME" ref={(c) => registerUsername =c}/><br /></center>
                    <center><input type="text" id="registerEmail" placeholder="EMAIL" ref={(c) => registerEmail =c}/><br /></center>
                    <center><input type="password" id="registerPassword" placeholder="PASSWORD" ref={(c) => registerPassword =c}/><br /></center>
                    <center><input type="password" id="retypePassword" placeholder="RETYPE PASSWORD"  ref={(c) => registerRetype =c}/><br /></center>
                    <center><input type="submit" id="registerButton" class="buttons" value = "SIGN UP" onClick={doRegister}/></center>
                    <span id="registerResult">{message}</span>
                </form>
            </div>
        </div>
    );
};

export default Register;