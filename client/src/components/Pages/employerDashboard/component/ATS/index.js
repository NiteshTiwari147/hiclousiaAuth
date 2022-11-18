import React, { Component } from "react";

class EmployerATS extends Component {
    render() {
        return <div className='ATScontainer shadow'>
            <div className="miniBox">
                <div>
                    <h6 className="headingATS">Job Posted</h6> 
                </div>
                <h6 className="ATS_score" style={{marginRight: '1rem'}}>
                    2
                </h6>
            </div>
            <div className="miniBox">
                <div>
                    <h6 className="headingATS">Active Job</h6> 
                </div>
                <h6 className="ATS_score" style={{marginRight: '1rem'}}>
                    2
                </h6>
            </div>
            <div className="miniBox">
                <div>
                    <h6 className="headingATS">Total Candidates</h6> 
                </div>
                <h6 className="ATS_score" style={{marginRight: '1rem'}}>
                    28
                </h6>
            </div>
            <div className="miniBox">
                <div>
                    <h6 className="headingATS">Bookmarked Candidates</h6> 
                </div>
                <h6 className="ATS_score" style={{marginRight: '1rem'}}>
                    12
                </h6>
            </div>
        </div>
    }
}

export default EmployerATS;