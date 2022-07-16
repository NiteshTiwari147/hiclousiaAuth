import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import StatBox from '../../../Jobs/components/statBox';

import './styles.css';

class CandidateCard extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        const {name, company, exp, comp, skills, logo, position} = this.props;
        return (
            <div className='jobCardContainer shadow'>
                <div className="jobCardHeadingContainer">
                    <div className='leftPane'>
                        <img className="candidateImage"  src={logo} />
                        <div style={{marginTop: '0.5rem'}}>
                            <Button variant="contained" size='small'>Details</Button>
                        </div>
                    </div>
                    <div className="introduction">
                        <h6 style={{marginBottom: '0.2rem', 'alignItems': 'center'}}>{name}</h6>
                        <h7 style={{marginTop: '0.3rem', color: 'grey'}}>{company}</h7>
                        <div style={{'width': '7rem', marginTop: '0.3rem'}}>
                            <Chip label="Active" color="success" />
                        </div>
                    </div>
                </div>
                <div className="stateBoxContainer">
                    <StatBox title='Position' value={position} />
                    <StatBox title='Skill Req' value={skills} />
                    <StatBox title='Experience' value={exp} />
                    <StatBox title='Compatibilty' value={comp} />
                </div>
            </div>
        )
    }
}

export default CandidateCard;