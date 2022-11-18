import React, { Component } from 'react';
import Button from '@mui/material/Button';

import candidate from '../../../data/avatarMan.jpg';
import recruiter from '../../../data/recruiterIcon.jpg';

import './styles.css';

class Welcome extends Component {
    render() {
        return (
            <div className='container' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '4rem'
            }}> 
                <div className='welcomePageTitle'>
                    <h5 style={{color: 'white'}}>Bridging the Gap between Employability & Jobs Landscape for the current & Future Jobs</h5>
                </div>
                <div className='userOptionPane'>
                    <div className='candidateOptions'>
                        <h5>Three simple steps to reach your Career Goal</h5>
                        <ul>
                            <li key='1'>1) Create the Career profile</li>
                            <li key='2'>2) Map your top skills with Industry trends</li>
                            <li key='3'>3) Get a suitable job on Skills, Ability & Experience</li>
                        </ul>
                        <Button size='large' variant='contained' color='primary'>
                            <a href='/talent/login' style={{color: 'white'}}>
                                Get a suitable Job Now
                            </a>
                        </Button>
                    </div>
                    <div className='recruiterOptions'>
                        <h5>Talent pool access for employers</h5>
                        <ul>
                            <li key='1'>1) Right Fit candidates</li>
                            <li key='2'>2) Direct Engagement</li>
                            <li key='3'>3) Verified Skills set</li>
                        </ul>
                        <Button size='large' variant='contained' color='primary'>
                            <a href='/hr/login' style={{color: 'white'}}>
                                Hire now 
                            </a>
                        </Button>
                    </div>
                    {/* <a className='userBox shadow'>
                        <img className="userIcon" src={recruiter} alt="Avatar"/>
                        <h5 className='userTitle'>Recruiter</h5>
                    </a> */}
                </div>
            </div>
        )
    }
};

export default Welcome;