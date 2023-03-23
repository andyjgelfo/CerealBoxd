import React from 'react';
import "../Styles/Login.css"

function Login()
{
    // var loginName; 
    // var loginPassword; 

    const doLogin = async event =>
    {
    }

    return(
        <div id="loginDiv">
            <form>
                <span id="title">LOGIN</span><br />
                <input type="text" id="loginName" placeholder="USERNAME"  /><br />
                <input type="password" id="loginPassword" placeholder="PASSWORD" /><br />
                <input type="submit" id="loginButton" class="buttons" value = "SIGN IN" onClick={doLogin} />
                <button id="registerButton" onclick="window.location.href='../Pages/RegisterPage.js';">Don't Have An Account? Register Here!</button>
            </form>
            <span id="loginResult"></span>
        </div>
    );

};

export default Login;
