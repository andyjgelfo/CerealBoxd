import React, { useState } from 'react';
import "../Styles/Login.css"; 
import { useEffect } from 'react'; 

function Login()
{
    useEffect(() => {
        document.title = 'Login';
    }, []);

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
                setMessage('User/Password combination incorrect');
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

    return(
        <div id="loginDiv">
             <form onSubmit={doLogin}>
                <span id="title">LOGIN</span><br />
                <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                <input type="submit" id="loginButton" class="buttons" value = "SIGN IN" onClick={doLogin} />
            </form>
            <a href="/RegisterPage"><button id="registerButton">Don't Have An Account? Register Here!</button></a>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;
