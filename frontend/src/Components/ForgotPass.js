import React, { useState, useRef } from 'react';
import "../Styles/Forgot.css"; 


function ForgotPass()
{
    var username;
    var obj;
    var js;
    var response = 2;
    const [message,setMessage] = useState('');
    var bp = require('./Path.js');
    


    const doForgot = async event => {
        event.preventDefault();

        try
        {
            var password = '';
            
            const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            for (var i = 16; i > 0; --i) password += chars[Math.floor(Math.random() * chars.length)];

            obj = {username: username.value, password: password};
            js = JSON.stringify(obj);

            response = await fetch(bp.buildPath('api/forgotPassword'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            

            var data = JSON.parse(await response.text());
            if (data.error)
                throw(data.error)
            
            
            
                

            var email = data.email;
            var recoveryEmail = data.recover;
            // var to;

            // if (document.getElementById('emailtype').checked) {
            //     if (data.recover === '')
            //     throw("recovery email was not found");
            //     to = recoveryEmail;
            // } else {
            //     to = email;
            // }


            var subject = "Temporary Password"

            var text = 'Your temporary password is: ' + password + "<br><br> Please be sure to change your password once logged in";
            obj = {to: email, subject: subject, output: text};
           
            js = JSON.stringify(obj);
            response = fetch(bp.buildPath('api/sendEmail'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            if (recoveryEmail!=null)
            {
                obj = {to: recoveryEmail, subject: subject, output: text};
                js = JSON.stringify(obj);
                response = fetch(bp.buildPath('api/sendEmail'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            }

            window.location.href = '/LoginPage';
            

            
        }
        catch(e)
        {
            setMessage(e);
        }
        

    }

    return(
        <div class='wrapper-forgot d-flex align-items-center justify-content-center'>
            <div class='container align-items-center justify-content-center' id="forgotDiv">
                <form onSubmit={doForgot}>
                    <center><span id= "title">Forgot Password?</span></center>
                    <center><text>Enter your username and choose which email option to send to</text></center>
                    <center><input type="text" id="usernameBox" placeholder='USERNAME' ref={(c) => username = c} /><br /></center>
                    
                    {/* <input type="radio" id="emailtype" name="email" value="primary"></input>
                    <label for="emailtype">Primary Email</label><br/>
                    
                    <input type="radio" id="emailtype" name="email" value="recovery"></input>
                    <label for="emailtype">Recovery Email</label> */}
                    
                    {/* <label><input type="checkbox" id="emailtype" name="email" value="recovery"/>
                    Send to recovery email instead?</label> */}


                    <center><input type="submit" id="submitButton" class="buttons" value="SUBMIT" onClick={doForgot}/></center>
                    <center><span id="confirmResult">{message}</span></center>
                </form>
            </div>
        </div>
    );
};



export default ForgotPass;