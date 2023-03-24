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

        var obj = {fName:registerFirstName.value,lName:registerLastName.value,userName:registerUsername.value,password:registerPassword.value};

        var js = JSON.stringify(obj);

        try
        {    
            window.alert(JSON.stringify(js));
            const response = await fetch(buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            
            // let txt = await response.text();
            // let res = JSON.parse(txt);

            // if( res.error.length > 0 )
            // {
            //     setMessage( "API Error:" + res.error );
            // }
            // else
            // {
            //     setMessage('User has been added');
            // }

            window.location.href = buildPath('/');
        }
        catch(e)
        {
            setMessage(e.toString());
        }
    
    }

    return(
    <div id="registerDiv">
        <form onSubmit={doRegister}>
            <span id="title">REGISTER</span><br />
            {/* <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br /> */}
            <input type="text" id="registerFirstName" placeholder="FIRST NAME" ref={(c) => registerFirstName =c}/><br />
            <input type="text" id="registerLastName" placeholder="LAST NAME" ref={(c) => registerLastName =c}/><br />
            <input type="text" id="registerUsername" placeholder="USERNAME" ref={(c) => registerUsername =c}/><br />
            {/* <input type="text" id="registerEMAIL" placeholder="EMAIL"/><br /> */}
            <input type="password" id="registerPassword" placeholder="PASSWORD" ref={(c) => registerPassword =c}/><br />
            {/* <input type="password" id="retypePassword" placeholder="RETYPE PASSWORD" /><br /> */}
            <input type="submit" id="registerButton" class="buttons" value = "SIGN UP" onclick={doRegister}/>
        </form>
    </div>
)};

export default Register;
