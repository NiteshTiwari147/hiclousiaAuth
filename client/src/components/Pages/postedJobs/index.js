import React, { Component } from "react";

import CandidateSuggestion from "./components/candidateSuggestion";

import './style.css';

class PostedJob extends Component {
    render() {
        return <div className="postedJobContainer">
            <div className="postedJobDetail">
                <div style={{padding: '2rem'}}>
                    <div className="jobDetailRow">
                        <label>Company Name:</label>
                        <div>PayPal</div>
                    </div>
                    <div className="jobDetailRow">
                        <label>Designation:</label>
                        <div>SDE-2</div>
                    </div>
                    <div className="jobDetailRow">
                        <label>Industry:</label>
                        <div>Information & Technology</div>
                    </div>
                    <div className="jobDetailRow">
                        <label>Department:</label>
                        <div>Back-end</div>
                    </div>
                    <div className="jobDetailRow">
                        <label>Budget:</label>
                        <div>6-9 lacs</div>
                    </div>
                    <div className="jobDetailRow">
                        <label>Location:</label>
                        <div>Chennai</div>
                    </div>
                </div>
            </div>
            <div className="candidateSuggestion">
                <CandidateSuggestion />
            </div>
        </div>
    }
}

export default PostedJob;