import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import "../Styles/Login.css"; 
import { useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Login()
{
    // Page Title
    useEffect(() => {
        AOS.init({duration : 2000});
        document.title = 'Login';
    }, []);

    var storage = require('../tokenStorage.js');

    let loginName;
    let loginPassword;

    const [message,setMessage] = useState('');

    var bp = require('./Path.js');

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

    const doLogin = async event =>
    {
        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

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
            var res = response.data;
            if (res.error) 
            {
                setMessage('User/Password combination incorrect');
            }
            else 
            {	
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
   
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
                var email = ud.payload.email;
                var verified = ud.payload.confirmed
                var id = ud.payload.id;
                if (verified === false)
                {
                    localStorage.setItem('email', email);
                    localStorage.setItem("id", id);
                    window.location.href = '/ConfirmEmail';
                }
                else
                {
                    var user = {firstName:firstName,lastName:lastName,username:userId, id:id}
                    localStorage.setItem('user_data', JSON.stringify(user));

                    window.location.href = '/CerealsPage';
                }
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });

    }

    return(
        <div class='wrapper-login d-flex align-items-center justify-content-center'>
            <div class='container align-items-center justify-content-center' id="loginDiv" data-aos="fade">
                <form onSubmit={doLogin}>
                    <center><span id= "title">LOGIN</span></center>
                    <center><input type="text" id="loginName" placeholder='USERNAME' ref={(c) => loginName = c} /><br /></center>
                    <center><input type="password" id="loginPassword" placeholder="PASSWORD" ref={(c) => loginPassword = c} /><br /></center>
                    <center><input type="submit" id="loginButton" class="buttons" value="SIGN IN" onClick={doLogin} /></center>
                    <center><a href="/RegisterPage"><span id="noAccount">Don't Have An Account? Register Here!</span></a></center>
                    <center><a href="/ForgotPass"><span id="noAccount">Forgot Your Password?</span></a></center>
                    <center><span id="loginResult">{message}</span></center>
                </form>
            </div>
        </div>
    );
};

export default Login;
