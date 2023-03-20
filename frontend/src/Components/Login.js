import React from 'react';
import "../Styles/Login.css"

function Login()
{
    const doLogin = async event =>
    {
        event.preventDefault();
        alert('doIt()');
    };

    return(
        <div id="loginDiv">
            <form onSubmit={doLogin}>
                <span id="title">LOGIN</span><br />
                <input type="text" id="loginName" placeholder="USERNAME"/><br />
                <input type="password" id="loginPassword" placeholder="PASSWORD" /><br />
                <input type="submit" id="loginButton" class="buttons" value = "SIGN IN" onClick={doLogin} />
                <button id="register-btn" onclick="window.location.href='../Pages/RegisterPage.js';">Don't Have An Account? Register Here!</button>
            </form>
            <span id="loginResult"></span>
        </div>
    );
};

export default Login;
