import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UpdateForm from '../../../Forms/UpdateForm';

import './styles.css';
import avatar from '../../../../data/avatarMan.jpg';

const currentEmploymnt = {
    designation: 'SDE-2',
    company: 'PayPal'
}

class CandidateHome extends Component {

    renderCandidateInfo(name, email) {
        return <div className='candidateInfoContent'>
        <img className="profilePic" src={avatar} alt="Avatar"/>
        <h5 className="profileName">{name}</h5>
        <h7 className="profilePosition">{email}</h7>
        <text className="profilePosition">{currentEmploymnt.designation} at {currentEmploymnt.company}</text>
    </div>
    }

    render() {
        const { candidate, project, skillSet } = this.props
        return (
                <div className='homeContainer'>
                    <div className='candidateContent'>
                        <div  style={{margin: '2rem'}}>
                            <div className='candidateStatContainer shadow'>
                                <Link to="/projectForm" className='fillBox'>
                                    Certificates
                                </Link>
                                <h5>6</h5>
                            </div>
                            <div className='candidateStatContainer shadow'>
                                <Link to="/educationForm" className='fillBox'>
                                    Skills
                                </Link>
                                {skillSet && skillSet.coreSkills && skillSet.coreSkills.length > 0 ? <h5>{skillSet.coreSkills.length}</h5> : <h5>0</h5>}
                            </div>  
                        </div>
                        {candidate && <div className='candidateInfoContainer'>
                            {this.renderCandidateInfo(candidate.name, candidate.email)} 
                        </div>
                        }
                        <div style={{margin: '2rem'}}>
                            <div className='candidateStatContainer shadow'>
                                <Link to="/projectForm" className='fillBox'>
                                    Project
                                </Link>
                                {project && project.length > 0 ? <h5>{project.length}</h5> : <h5>0</h5>}
                            </div>
                            <div className='candidateStatContainer shadow'>
                                <Link to="/educationForm" className='fillBox'>
                                    Shortlisted Jobs
                                </Link>
                                <h5>34</h5>
                            </div>  
                        </div>
                        </div>
                    <div className='candidateOptions'>
                        <UpdateForm />
                    </div>
                </div>
        )
    }
};

function mapStateToProps({candidate, project, skillSet}) {
    return { candidate, project, skillSet }
}

export default connect(mapStateToProps)(CandidateHome);