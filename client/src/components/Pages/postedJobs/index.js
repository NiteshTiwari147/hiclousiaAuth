import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import LoadingScreen from '../../utils/loadingScreen';
import CandidateSuggestion from "./components/candidateSuggestion";

import './style.css';

class PostedJob extends Component {
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search)
        this.props.fetchPostedJob({
            value: {
                jobID: params.get('jobID')
            }
        })
        .then(res => {
            const {companyName,
                jobID,
                experience,
                description,
                industry,
                department,
                skills,
                cities,
                budget } = this.props.postedJobDetail;
            this.props.fetchTalent({
                value: {
                    industry: industry,
                    department: department,
                    experience: experience,
                    budget: budget
                }
            });
        })
    }
    render() {
        if(this.props && this.props.postedJobDetail) {
            const {companyName,
                jobID,
                experience,
                description,
                industry,
                department,
                skills,
                cities,
                budget } = this.props.postedJobDetail;
            const { suggestedTalent } = this.props;
            return <div className="postedJobContainer">
                <div className="postedJobDetail">
                    <div style={{padding: '2rem'}}>
                    <div className="jobDetailRow">
                            <label>Job ID:</label>
                            <div>{jobID}</div>
                        </div>
                        <div className="jobDetailRow">
                            <label>Company Name:</label>
                            <div>{companyName}</div>
                        </div>
                        <div className="jobDetailRow">
                            <label>Skills:</label>
                            <div style={{display: 'flex'}}>{skills && skills.map(s => <p style={{marginRight: '5px', border: '1px solid #1072EB', padding: '2px', borderRadius: '5px'}}>{`${s} `}</p>)}</div> 
                        </div>
                        <div className="jobDetailRow">
                            <label>Industry:</label>
                            <div>{industry}</div>
                        </div>
                        <div className="jobDetailRow">
                            <label>Department:</label>
                            {department && department.map(d => <div>{d}</div>)}    
                        </div>
                        <div className="jobDetailRow">
                            <label>Experience :</label>
                            <div>{experience.min}-{experience.max}</div>
                        </div>
                        <div className="jobDetailRow">
                            <label>Budget:</label>
                            <div>{budget.min}-{budget.max}</div>
                        </div>
                        <div className="jobDetailRow">
                            <label>Location:</label>
                            {cities && cities.map(c => <div>{c}</div>)}
                        </div>
                    </div>
                </div>
                <div className="candidateSuggestion">
                    <CandidateSuggestion data={suggestedTalent}/>
                </div>
            </div>
        } else {
            <LoadingScreen />
        }
    }
}

function mapStateToProps({auth, hr, postedJobDetail, suggestedTalent}) {
    return { auth, hr, postedJobDetail, suggestedTalent }
}

export default connect(mapStateToProps, actions)(PostedJob);