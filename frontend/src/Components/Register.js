import React, { useState } from 'react';
import "../Styles/Register.css"
import { useEffect } from 'react'; 

function Register()
{
    useEffect(() => {
        document.title = 'Register';
    }, []);

    let user = '';
    let search = '';
    let registerFirstName;
    let registerLastName;
    let registerUsername;
    let registerEmail;
    let registerPassword;
    let registerRetype;

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

        var obj = {fName:registerFirstName.value,lName:registerLastName.value,userName:registerUsername.value,password:registerPassword.value,email:registerEmail.value};

        var js = JSON.stringify(obj);

        var obj2 = {username:registerUsername};
        var js2 = JSON.stringify(obj2);

        try
        {
            if (registerPassword.value !== registerRetype.value)
            {
                throw("Retype Password does not match Password");
            }    

            // let RegUse = registerUsername.value.toString();

            // alert("stan loona");

            const res = await fetch (buildPath('api/checkUsername'), 
            {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            alert("stan Weeekly");

            var dupe = JSON.parse(await res.text()); 
            
            alert("stan GFRIEND");

            // let txt = await res.text();

            // alert("stan Weeekly");
            // let dupe = JSON.parse(txt);
            // alert("stan Adora");
            // var dupe = JSON.parse(await dupe.text());
            alert(dupe.results)

            if (dupe.results !== 0)
            {
                throw("User with this username already exists");
            }

            // window.alert(JSON.stringify(js));
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

            window.location.href = buildPath('');
        }
        catch(e)
        {
            setMessage(e.toString());
        }
    
    }

    return (
        <div class='wrapper-register d-flex align-items-center justify-content-center'>
            <div class='container align-items-center justify-content-center' id="registerDiv">
                <form onSubmit={doRegister}>
                    <center><span id= "title">REGISTER</span></center>
                    <center><input type="text" id="registerFirstName" placeholder="FIRST NAME" ref={(c) => registerFirstName =c}/><br /></center>
                    <center><input type="text" id="registerLastName" placeholder="LAST NAME" ref={(c) => registerLastName =c}/><br /></center>
                    <center><input type="text" id="registerUsername" placeholder="USERNAME" ref={(c) => registerUsername =c}/><br /></center>
                    <center><input type="text" id="registerEmail" placeholder="EMAIL" ref={(c) => registerEmail =c}/><br /></center>
                    <center><input type="password" id="registerPassword" placeholder="PASSWORD" ref={(c) => registerPassword =c}/><br /></center>
                    <center><input type="password" id="retypePassword" placeholder="RETYPE PASSWORD" ref={(c) => registerRetype =c}/><br /></center>
                    <center><input type="submit" id="registerButton" class="buttons" value = "SIGN UP" onclick={doRegister}/></center>
                    <span id="registerResult">{message}</span>
                </form>
            </div>
        </div>
    );
};

export default Register;