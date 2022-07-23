import React, { Component } from 'react';

import candidate from '../../../data/avatarMan.jpg';
import recruiter from '../../../data/recruiterIcon.jpg';

import './styles.css';

class Welcome extends Component {
    render() {
        return (
            <div className='container' style={{
                'height': '42rem'
            }}> 
                <div className='welcomePageTitle'>
                    <h1>Hey there !!!</h1>
                    <h2>Welcome to Hiclousia, please identify yourself from below options !!! </h2>
                </div>
                <div className='userOptionPane'>
                    <a className='userBox shadow'>
                        <img className="userIcon" src={candidate} alt="Avatar"/>
                        <h5 className='userTitle'>Candidate</h5>
                    </a>
                    <a className='userBox shadow'>
                        <img className="userIcon" src={recruiter} alt="Avatar"/>
                        <h5 className='userTitle'>Recruiter</h5>
                    </a>
                </div>
            </div>
        )
    }
};

export default Welcome;