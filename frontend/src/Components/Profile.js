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
                    <Tab eventKey="home" title="Favorites" className="Hi">
                        <div className="Favorites">ahahaha</div>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                        <div className="textArea">Test test</div>
                    </Tab>
                    <Tab eventKey="contact" title="Contact">
                        <div className="textArea">Hi Thomas</div>
                    </Tab>
                </Tabs>
            </div>
        </div>
        
    );

};



export default Profile;

