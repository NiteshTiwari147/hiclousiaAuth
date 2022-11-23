import React, { Component } from 'react';
import Button from '@mui/material/Button';

import StatBox from '../statBox';

import companyLogo from '../../../../../data/companyLogo.jpg';

import './styles.css';

class JobCard extends Component {

    constructor(props) {
        super(props)
    }

    renderOptions() {
        return  <Button className='applyBtn' variant="contained" size='small'>
                Apply
            </Button>
    }

    calculateSkillMatching(skillReq=[], skillPos=[]) {
        const total = skillReq.length;
        var match=0;
        skillReq.map(skill => {
            const found = skillPos.find(el => el.skillName === skill);
            if(found) {
            match++;
            }
        })
        return Math.ceil((match/total) * 100);
    }

    render() {
        const { companyName, exp, budget, skills, skillPos } = this.props;
        return (
            <div className='jobCardContainer shadow'>
                <div className="jobCardHeadingContainer">
                    <div>
                        <img className="companyImage"  src={companyLogo} /> 
                    </div>
                    <div className="introduction">
                        <h5 style={{marginBottom: '0.2rem'}}>{companyName}</h5>
                        <a style={{fontSize: 'smaller', marginTop: '0.3rem'}}>Read Job Description</a>
                        {this.renderOptions()}
                    </div>
                </div>
                <div className="stateBoxContainer">
                    <StatBox title='Budget' value={`${budget.min}-${budget.max} LPA`} />
                    <StatBox title='Skill Matched' value={`${this.calculateSkillMatching(skills, skillPos)} %`} />
                    <StatBox title='Experience' value={`${exp.min}-${exp.max} yrs`} />
                    <StatBox title='Compatibilty' value='83%' />
                </div>
            </div>
        )
    }
}

export default JobCard;