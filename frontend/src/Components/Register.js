import React, { useState } from 'react';
import "../Styles/Register.css"

function Register()
{
    let user = '';
    let search = '';
    let registerFirstName;
    let registerLastName;
    let registerUsername;
    let registerEmail;
    let registerPassword;

    const [message, setMessage] = useState()

    const app_name = 'cerealboxd'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    const doRegister = async event => 
    {
        event.preventDefault();

        var obj = {registerFirstName:registerFirstName, registerLastName:registerLastName, registerUsername:registerUsername,registerPassword:registerPassword};

        var js = JSON.stringify(obj);

        try
        {    
            
            const response = await fetch(buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            
            // var res = JSON.parse(await response.text());

            // if( res.id <= 0 )
            // {
            //     setMessage('User/Password combination incorrect');
            // }
            // else
            // {
            //     var user = {firstName:res.fName,lastName:res.lName,id:res.id}
            //     localStorage.setItem('user_data', JSON.stringify(user));
                
            //     // setMessage(JSON.stringify(user));
            //     setMessage('');
            //     window.location.href = buildPath('AboutPage');
            // }
            window.location.href = buildPath('/');
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    return(
    <div id="registerDiv">
        <form>
            <span id="title">REGISTER</span><br />
            {/* <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br /> */}
            <input type="text" id="registerFirstName" placeholder="FIRST NAME" ref={(c) => registerFirstName =c}/><br />
            <input type="text" id="registerLastName" placeholder="LAST NAME"/><br />
            <input type="text" id="registerUsername" placeholder="USERNAME"/><br />
            {/* <input type="text" id="registerEMAIL" placeholder="EMAIL"/><br /> */}
            <input type="password" id="registerPassword" placeholder="PASSWORD" /><br />
            {/* <input type="password" id="retypePassword" placeholder="RETYPE PASSWORD" /><br /> */}
            <input type="submit" id="registerButton" class="buttons" value = "SIGN UP" onclick={doRegister}/>
        </form>
    </div>
)};

export default Register;
