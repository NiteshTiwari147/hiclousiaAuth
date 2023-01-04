import React, { Component } from 'react';

import './styles.css';

class ATS extends Component {
    render() {
        const { projectLen, education, experienceYears ,experienceMonths, department} = this.props;
        const { institute, course } = education ? education[0] : {
            institute: '',
            course: ''
        };
        return (
            <div className='ATScontainer shadow'>
                <div className="miniBox">
                    <div>
                        <h6 className="headingATS">Total Projects</h6> 
                    </div>
                    <h6 className="ATS_score" style={{marginRight: '1rem'}}>
                        {projectLen}
                    </h6>
                </div>
                <div className="miniBox">
                    <div>
                        <h6 className="headingATS">Highest education</h6> 
                    </div>
                    <h6 className="ATS_score" style={{marginRight: '1rem'}}>
                        {course.toUpperCase()} at {institute.toUpperCase()}
                    </h6>
                </div>
                <div className="miniBox">
                    <div>
                        <h6 className="headingATS">Experience</h6> 
                    </div>
                    <h6 className="ATS_score" style={{marginRight: '1rem'}}>
                        {experienceYears}.{experienceMonths} yrs
                    </h6>
                </div>
                <div className="miniBox">
                    <div>
                        <h6 className="headingATS">Expected Position</h6> 
                    </div>
                    <div>
                        {department.map(d => <p className="ATS_score" style={{fontSize: '10px', fontWeight: '500', marginRight: '1rem'}}>
                            {d}
                        </p>)}
                    </div>        
                </div>
            </div>
        )
    }
}

export default ATS;