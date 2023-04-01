import React, { useState } from 'react';
import "../Styles/Login.css"; 
import { useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 

function Login()
{
    // Page Title
    useEffect(() => {
        document.title = 'Login';
    }, []);

    let loginName;
    let loginPassword;
    let error_message

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
                //setMessage('Username/Password Combination Incorrect');
                error_message = '<p class ="error">Username/Password Combination Incorrect</p>'; 
                $("#result").html(error_message); 
            }
            else
            {
                var user = {firstName:res.fName,lastName:res.lName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                
                // setMessage(JSON.stringify(user));
                setMessage('');
                window.location.href = buildPath('AboutPage');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }   
    }

    // error_message = '<p class="error">This field is required</p>';
    // $("#result").html(error_message);
    // return false;

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
