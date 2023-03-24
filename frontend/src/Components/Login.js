import React, { useState } from 'react';
import "../Styles/Login.css"

function Login()
{
    // var loginName; 
    // var loginPassword; 
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
            window.alert("stan weeekly");

            if( res.id <= 0 )
            {
                window.alert("stan weeekly 1");
                setMessage('User/Password combination incorrect');
            }
            else
            {
                window.alert("stan weeekly 2");
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }   
    }

    return(
        <div id="loginDiv">
             <form onSubmit={doLogin}>
                <span id="title">LOGIN</span><br />
                <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                <input type="submit" id="loginButton" class="buttons" value = "SIGN IN" onClick={doLogin} />
                <button id="registerButton" onclick="window.location.href='../Pages/RegisterPage.js';">Don't Have An Account? Register Here!</button>
            </form>
            <span id="loginResult"></span>
        </div>
    );

};

export default Login;
