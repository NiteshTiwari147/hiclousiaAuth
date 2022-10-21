import React, { Component } from 'react';
import Divider from '@mui/material/Divider';
import ReactTooltip from "react-tooltip";
import Button from '@mui/material/Button';

import './styles.css';

class Certificate extends Component {
    renderSkillCertificate(data) {
        return <div>
                <div className='certificate'>
                <div className='skillName'>
                    {data.toUpperCase()}
                </div>
                <Button data-tip data-for='certificate' variant="outlined">
                    View
                </Button>
                <ReactTooltip id='certificate' effect="solid" className="certicateViewer" place='left' delayHide={1000} >
                    <div className='certicateDocument'>
                        Nothing to show
                    </div>
                </ReactTooltip>
            </div>
            <Divider/>
        </div>

    }
    render() {
        const skillList = this.props.data;
        return (
            <div className='certicatesContainer shadow'>
                <h5 style={{"color": "#1072EB"}}>Skills & Certificates</h5>
                <Divider color='skyblue'/>
                <div className='certicateContent'>
                    {skillList.map(skill => this.renderSkillCertificate(skill.skillName))}
                </div>
            </div>
        )
    }
}

export default Certificate;