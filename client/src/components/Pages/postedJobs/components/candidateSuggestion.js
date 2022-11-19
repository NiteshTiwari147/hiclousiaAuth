import { Button } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../style.css';


class CandidateSuggestion extends Component {
    constructor(props) {
        super(props);
    }

    calculateSkillMatch(talentSkills) {
        if(this.props.postedJobDetail && talentSkills) {
            const { skills } = this.props.postedJobDetail;
            const total = skills.length;
            var match=0;
            skills.map(skill => {
               const found = talentSkills.find(el => el.skillName === skill);
               if(found) {
                match++;
               }
            })
            return Math.ceil((match/total) * 100);
        }
        return 0;
    }
    
    renderDepartment(expectedDepartment) {
        if(this.props.postedJobDetail && expectedDepartment) {
            const { department } = this.props.postedJobDetail;
            return department.map(el => expectedDepartment.find(val => el === val));
        }
        return 'N.A'
    }

    renderCandidateRow(candidate) {
        console.log(candidate);
        const {
            name,
            skills,
            budget,
            expectedDepartment,
            skillScore,
            educationScore,
            selfScore,
            industryScore,
        } = candidate;
        return <div className="suggestedCandidateRow">
            <div style={{width: '20%'}}>
                <img class="candidateImage" src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" />
                <p style={{marginLeft: '5px', marginTop:'2px', fontWeight: 500}}>{name}</p>
                <button>View Profile</button>
            </div>
            <div style={{display: 'flex', width: '80%'}}>
                <div style={{marginRight: '1rem'}}>
                    <div className="candidateRowStatBox">
                        <label >Expected Designation</label>
                        <div>
                            {this.renderDepartment(expectedDepartment)}
                        </div>
                    </div>
                    <div className="candidateRowStatBox">
                        <label >Expected CTC</label>
                        <div>
                            {budget.min}-{budget.max} LPA
                        </div>
                    </div>
                </div>
                <div style={{marginRight: '1rem'}}>
                    <div className="candidateRowStatBox">
                        <label >Total Experience</label>
                        <div>
                            N.A
                        </div>
                    </div>
                    <div className="candidateRowStatBox">
                        <label >Skill Match</label>
                        <div>
                            {this.calculateSkillMatch(skills)} %
                        </div>
                    </div>
                </div>
                <div style={{marginRight: '1rem'}}>
                    <div className="candidateRowStatBox">
                        <label >Skill Compentency</label>
                        <div>
                            {skillScore}
                        </div>
                    </div>
                    <div className="candidateRowStatBox">
                        <label >Self Compentency</label>
                        <div>
                            {selfScore}
                        </div>
                    </div>
                </div>
                <div style={{marginRight: '1rem'}}>
                    <div className="candidateRowStatBox">
                        <label >Education Compentency</label>
                        <div>
                            {educationScore}
                        </div>
                    </div>
                    <div className="candidateRowStatBox">
                        <label >Industry Compentency</label>
                        <div>
                            {industryScore}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    render() {
        const candidates = this.props.suggestedTalent;
        if(candidates && candidates.length > 0) {
            return <div className="candidateSuggestionContainer">
                {candidates.map( candidate => this.renderCandidateRow(candidate))}
        </div>
        } else {
            return <div>Please wait We are searching</div>
        }   
    }
}

function mapStateToProps({auth, hr, postedJobDetail, suggestedTalent}) {
    return { auth, hr, postedJobDetail, suggestedTalent }
}

export default connect(mapStateToProps)(CandidateSuggestion);