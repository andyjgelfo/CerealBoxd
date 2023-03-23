import React from 'react';
import "../Styles/Register.css"

function Register()
{
    <div id="registerDiv">
        <form>
            <span id="title">REGISTER</span><br />
            <input type="text" id="registerUsername" placeholder="USERNAME"/><br />
            <input type="text" id="registerEMAIL" placeholder="EMAIL"/><br />
            <input type="password" id="registerPassword" placeholder="PASSWORD" /><br />
            <input type="password" id="retypePassword" placeholder="RETYPE PASSWORD" /><br />
            <input type="submit" id="registerButton" class="buttons" value = "SIGN UP" onclick="window.location.href='../Pages/LoginPage.js';"/>
        </form>
    </div>
};

export default Register;
