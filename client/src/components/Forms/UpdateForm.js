import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateForm extends Component {
    render() {
        return (
            <div className='updateForm container'>
                <div className='updateCardContainer shadow'>
                    <Link to="/projectForm" className='fillBox'>
                        Add Project
                    </Link>
                </div>
                <div className='updateCardContainer shadow'>
                    <Link to="/educationForm" className='fillBox'>
                        Add Education
                    </Link>
                </div>
                <div className='updateCardContainer shadow'>
                    <Link to="/experienceForm" className='fillBox'>
                        Add Experience
                    </Link>
                </div>
                <div className='updateCardContainer shadow'>
                    <Link to="/" className='fillBox'>
                        Upload Certificate
                    </Link>
                </div>
                <div className='updateCardContainer shadow'>
                    <Link to="/dashboard" className='fillBox'>
                        View Dashboard
                    </Link>
                </div>
            </div>
        )
    }
}

export default UpdateForm;