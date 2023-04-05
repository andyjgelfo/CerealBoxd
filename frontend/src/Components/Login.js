import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import "../Styles/Login.css"; 
import { useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 


function Login()
{
    // Page Title
    useEffect(() => {
        document.title = 'Login';
    }, []);

    var storage = require('../tokenStorage.js');

    let loginName;
    let loginPassword;

    const [message,setMessage] = useState('');

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

    const doLogin = async event =>
    {
        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('Username/Password Combination Incorrect');
            }
            else
            {
                alert("Stan Loona 1");
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');
    
                alert("Stan Loona 2");
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                alert("Stan Loona 3");
                var userId = ud.payload.userName;
                var firstName = ud.payload.fName;
                var lastName = ud.payload.lName;
                  
                alert("Stan Loona 4");
                var user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));

                // var user = {firstName:res.fName,lastName:res.lName,id:res.id}
                // localStorage.setItem('user_data', JSON.stringify(user));
                
                // setMessage(JSON.stringify(user));
                // setMessage('');
                window.location.href = buildPath('AboutPage');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }   
    }

    return(
        <div class='wrapper-login d-flex align-items-center justify-content-center'>
            <div class='container align-items-center justify-content-center' id="loginDiv">
                <form onSubmit={doLogin}>
                    <center><span id= "title">LOGIN</span></center>
                    <center><input type="text" id="loginName" placeholder='USERNAME' ref={(c) => loginName = c} /><br /></center>
                    <center><input type="password" id="loginPassword" placeholder="PASSWORD" ref={(c) => loginPassword = c} /><br /></center>
                    <center><input type="submit" id="loginButton" class="buttons" value="SIGN IN" onClick={doLogin} /></center>
                    <center><a href="/RegisterPage"><span id="noAccount">Don't Have An Account? Register Here!</span></a></center>
                    <span id="loginResult">{message}</span>
                </form>
            </div>
        </div>
    );
};

export default Login;
