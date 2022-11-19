import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import LoadingScreen from '../../utils/loadingScreen';
import CandidateSuggestion from "./components/candidateSuggestion";

import './style.css';

class PostedJob extends Component {
    componentDidMount() {
        this.props.fetchPostedJob({
            value: {
                jobID: localStorage.getItem("jobID")
            }
        })
        .then(res => {
            console.log("here is the jon detial", this.props.postedJobDetail);
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
                    <CandidateSuggestion />
                </div>
            </div>
        } else {
            <LoadingScreen />
        }
    }
}

function mapStateToProps({auth, hr, postedJobDetail}) {
    return { auth, hr, postedJobDetail }
}

export default connect(mapStateToProps, actions)(PostedJob);