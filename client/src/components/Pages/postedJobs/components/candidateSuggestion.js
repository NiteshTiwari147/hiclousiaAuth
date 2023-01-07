import { Button } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../style.css';
import MatchedSkills from './skillList';
import LoadingScreen from '../../../utils/loadingScreen';
import * as actions from '../../../../actions';

var matchedSkill = [];
class CandidateSuggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchedSkill: []
        }
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
                matchedSkill.push(found.skillName);
               }
            })
            return Math.ceil((match/total) * 100);
        }
        return 0;
    }

    renderMatchedSkill(skills) {
        return skills.map(skill => <label style={{fontSize: '12px'}}>{skill}</label>)
    }
    
    renderDepartment(expectedDepartment) {
        if(this.props.postedJobDetail && expectedDepartment) {
            const { department } = this.props.postedJobDetail;
            const found = department.filter((el) => {
                return expectedDepartment.includes(el)
            });
            if(found.length>0) {
                return found[0];
            }
        }
        return 'N.A'
    }

    renderCandidateRow(candidate) {
        const {
            hiclousiaID,
            name,
            skills,
            budget,
            cities,
            experience,
            expectedDepartment,
            skillScore,
            educationScore,
            selfScore,
            industryScore,
        } = candidate;
        let prefferedCity='';
        if(cities.length === 1 ) {
            prefferedCity = cities[0];
        } else if(cities.length > 1) {
            prefferedCity = cities[0];
            prefferedCity = prefferedCity + ' + more'
        }
        return <div className="suggestedCandidateRow">
            <div style={{width: '20%'}}>
                <img class="candidateImage" src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" />
                <p style={{marginLeft: '5px', marginTop:'2px', fontWeight: 500}}>{name}</p>
                <Button size='small' variant='contained' color='primary'><a style={{color: 'white'}} href={`/candidate?id=${hiclousiaID}`}>View Detail</a></Button>
            </div>
            <div style={{display: 'flex',flexDirection: 'column', width: '80%'}}>
                <div style={{display: 'flex'}}>
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
                                {experience.year} yrs {experience.month} mnths
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
                                {Math.ceil(skillScore)}
                            </div>
                        </div>
                        <div className="candidateRowStatBox">
                            <label >Preferred Location</label>
                            <div>
                                {prefferedCity}
                            </div>
                        </div>
                    </div>
                    <div style={{marginRight: '1rem'}}>
                        <div className="candidateRowStatBox">
                            <label >Education Compentency</label>
                            <div>
                                {Math.ceil(educationScore)}
                            </div>
                        </div>
                        <div className="candidateRowStatBox">
                            <label >Industry Compentency</label>
                            <div>
                                {Math.ceil(industryScore)}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <MatchedSkills skills={matchedSkill}/>
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
            return <LoadingScreen />
        }   
    }
}

function mapStateToProps({auth, hr, postedJobDetail, suggestedTalent}) {
    return { auth, hr, postedJobDetail, suggestedTalent }
}

export default connect(mapStateToProps, actions)(CandidateSuggestion);