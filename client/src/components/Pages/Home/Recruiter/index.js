import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

import '../styles.css';
import avatar from '../../../../data/avatarMan.jpg';

const currentEmploymnt = {
    designation: 'Technical Recruiter',
    company: 'Purple Box'
}

class RecruiterHome extends Component {

    renderUserInfo(name, email) {
        return <div className='userInfoContent'>
        <img className="profilePic" src={avatar} alt="Avatar"/>
        <h5 className="profileName">{name}</h5>
        <h7 className="profilePosition">{email}</h7>
        <text className="profilePosition">{currentEmploymnt.designation} at {currentEmploymnt.company}</text>
    </div>
    }
    render() {
        return <div className='homeContainer'>
            <div className='homeContent'>
                <div  style={{margin: '2rem'}}>
                    <div className='userStatContainer shadow'>
                        <Link to="/projectForm" className='fillBox'>
                            Posted Jobs
                        </Link>
                        <h5>6</h5>
                    </div>
                    <div className='userStatContainer shadow'>
                        <Link to="/educationForm" className='fillBox'>
                            Saved Candidates
                        </Link>
                        <h5>38</h5>
                    </div>  
                </div>
                <div className='userInfoContainer'>
                    {this.renderUserInfo('Swati', 'xxxx@gmail.com')}
                </div>
                <div  style={{margin: '2rem'}}>
                    <div className='userStatContainer shadow'>
                        <Link to="/projectForm" className='fillBox'>
                            Shortlisted Candidates
                        </Link>
                        <h5>16</h5>
                    </div>
                    <div className='userStatContainer shadow'>
                        <Link to="/educationForm" className='fillBox'>
                            Write review
                        </Link>
                        <div>
                        <EditIcon />
                        </div>
                    </div>  
                </div>
            </div>
            <div className='homeOptions'>
                <div className='userStatContainer shadow'>
                    <Link to="/dashboard" className='fillBox'>
                        Post A Job
                    </Link>
                </div>
            </div>
        </div>
    }
}

function mapStateToProps({candidate}) {
    return { candidate }
}

export default connect(mapStateToProps)(RecruiterHome);