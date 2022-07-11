import React, { Component } from 'react';
import Button from '@mui/material/Button';

import StatBox from '../statBox';

import './styles.css';

class JobCard extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { logo, companyName, slryRnge, position, skills } = this.props;
        return (
            <div className='jobCardContainer shadow'>
                <div className="jobCardHeadingContainer">
                    <div>
                        <img className="companyImage"  src={logo} /> 
                    </div>
                    <div className="introduction">
                        <h5 style={{marginBottom: '0.2rem'}}>{companyName}</h5>
                        <h7 style={{marginTop: '0.3rem', color: 'blue'}}>Read Job Description</h7>
                        <Button className='applyBtn' variant="contained">
                            Apply
                        </Button>
                    </div>
                </div>
                <div className="stateBoxContainer">
                    <StatBox title='Position' value={position} />
                    <StatBox title='Skill Req' value={skills} />
                    <StatBox title='Experience' value='2-4' />
                    <StatBox title='Compatibilty' value='83%' />
                </div>
            </div>
        )
    }
}

export default JobCard;