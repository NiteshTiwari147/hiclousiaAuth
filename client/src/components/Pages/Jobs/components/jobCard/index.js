import React, { Component } from 'react';
import Button from '@mui/material/Button';

import StatBox from '../statBox';

import './styles.css';

class JobCard extends Component {

    constructor(props) {
        super(props)
    }

    renderOptions(origin) {
        if(origin === 'client') {
            return  <div style={{ marginTop: '0.3rem'}}>
                    <Button className='applyBtn' variant="contained" size='small'>
                        <div style={{fontSize: 'smaller'}}>view candidates</div>
                    </Button>
            </div>
        }
        return  <Button className='applyBtn' variant="contained" size='small'>
                Apply
            </Button>
    }

    render() {
        const { logo, companyName, slryRnge, position, skills, origin } = this.props;
        return (
            <div className='jobCardContainer shadow'>
                <div className="jobCardHeadingContainer">
                    <div>
                        <img className="companyImage"  src={logo} /> 
                    </div>
                    <div className="introduction">
                        <h5 style={{marginBottom: '0.2rem'}}>{companyName}</h5>
                        <a style={{fontSize: 'smaller', marginTop: '0.3rem'}}>Read Job Description</a>
                        {this.renderOptions(origin)}
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