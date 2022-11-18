import { Button } from '@mui/material';
import React, { Component } from 'react';

import '../style.css';


class CandidateSuggestion extends Component {

    renderCandidateRow() {
        return <div className="suggestedCandidateRow">
            <div style={{width: '20%'}}>
                <img class="candidateImage" src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" />
                <p style={{marginLeft: '5px', marginTop:'2px', fontWeight: 500}}>Nitesh Tiwari</p>
                <button>View Profile</button>
            </div>
            <div style={{display: 'flex', width: '80%'}}>
                <div style={{marginRight: '1rem'}}>
                    <div className="candidateRowStatBox">
                        <label >Expected Designation</label>
                        <div>
                            Full Stack Level 2
                        </div>
                    </div>
                    <div className="candidateRowStatBox">
                        <label >Expected CTC</label>
                        <div>
                            6 LPA - 10 LPA
                        </div>
                    </div>
                </div>
                <div style={{marginRight: '1rem'}}>
                    <div className="candidateRowStatBox">
                        <label >Total Experience</label>
                        <div>
                            3.3 yrs
                        </div>
                    </div>
                    <div className="candidateRowStatBox">
                        <label >Skill Match</label>
                        <div>
                            84%
                        </div>
                    </div>
                </div>
                <div style={{marginRight: '1rem'}}>
                    <div className="candidateRowStatBox">
                        <label >Skill Compentency</label>
                        <div>
                            78%
                        </div>
                    </div>
                    <div className="candidateRowStatBox">
                        <label >Self Compentency</label>
                        <div>
                            78%
                        </div>
                    </div>
                </div>
                <div style={{marginRight: '1rem'}}>
                    <div className="candidateRowStatBox">
                        <label >Education Compentency</label>
                        <div>
                            78%
                        </div>
                    </div>
                    <div className="candidateRowStatBox">
                        <label >Industry Compentency</label>
                        <div>
                            78%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    render() {
        return <div className="candidateSuggestionContainer">
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
        {this.renderCandidateRow()}
    </div>
    }
}

export default CandidateSuggestion;