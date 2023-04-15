import React from 'react'; 
import { useEffect } from 'react';
import "../Styles/Profile.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function Profile()
{
    useEffect(() => {
        document.title = 'Cerealboxd';
    }, []);

    return(
        <div>
            <div className='Info'>
                blah
            </div>
            <div className='TabBox'>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    >
                    <Tab eventKey="home" title="Home" className="Hi">
                        <p>ahahaha</p>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                        <p>Test test</p>
                    </Tab>
                    <Tab eventKey="contact" title="Contact">
                        <p>Hi Thomas</p>
                    </Tab>
                </Tabs>
            </div>
        </div>
        
    );

};



export default Profile;

