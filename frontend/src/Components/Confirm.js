import React, { useState, useRef } from 'react';
import { useEffect } from 'react'; 
import "../Styles/Confirm.css"; 
// import AOS from 'aos';
// import 'aos/dist/aos.css';



function Confirm()
{
    var obj;
    var js;
    var code;
    var response;

    let codeInput
    const [message,setMessage] = useState('');
    var bp = require('./Path.js');

    const dataFetchedRef = useRef(false);


    useEffect(() => {
        (async() => {
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            code = Math.floor(100000 + Math.random() * 900000);
            var text = 'Your verification code is ' + code;
            var subject = "Confirm Your Email Address";
            obj = {to:localStorage.getItem('email'), subject: subject, output: text};
            js = JSON.stringify(obj);
            response = fetch(bp.buildPath('api/sendEmail'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        })();
    }, []);


    const doConfirm = async event => {
        event.preventDefault();
        if (code == codeInput.value)
        {
            obj = {_id:localStorage.getItem('id')}
            js = JSON.stringify(obj);
            response = fetch(bp.buildPath('api/confirmEmail'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                window.location.href = '/LoginPage';


        }
        else
            setMessage("Code entered is incorrect");

        

    }
    return(

        <div class='wrapper-confirm d-flex align-items-center justify-content-center'>
            <div class='container align-items-center justify-content-center' id="confirmDiv">
                <form onSubmit={doConfirm}>
                    <center><span id= "title">Confirm Email</span></center>
                    <center><text>A verification code has been sent to your email, please enter it</text></center>
                    <center><input type="text" id="codeBox" placeholder='CODE' ref={(c) => codeInput = c} /><br /></center>
                    <center><input type="submit" id="confirmButton" class="buttons" value="SUBMIT" onClick={doConfirm}/></center>
                    <center><span id="confirmResult">{message}</span></center>
                </form>
            </div>
        </div>
    );
}

export default Confirm