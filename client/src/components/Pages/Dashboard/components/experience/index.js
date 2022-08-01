import React, { Component } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import Divider from '@mui/material/Divider';
import Button from  '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import ExperienceListingModal from './listingModal';

import './styles.css';

class ExperienceTab extends Component {

    constructor(props) {
        super(props);
        this.state = { modalOpen: false}
    };

    handleModalOpen() {
        this.setState({modalOpen: true})
    }

    handleModalClose() {
        this.setState({modalOpen: false})
    }

    renderExperience(company, designation) {
        return <div>
            <div className='experienceContent'>
                <div className='experienceIcon'>
                    <BusinessIcon sx={{ fontSize: 30 }} />
                </div>
                <div className='experienceInfo'>
                <div className='experienceCompany'>
                    {company}
                </div>
                <div className='experienceDesignation'>
                    {designation}
                </div>
                <div className='experienceDuration'>
                    2019-Continue
                </div>
            </div>
            </div>
            <Divider color='skyblue'/>
        </div>
    }
    render() {
        const isEmpty = this.props.isEmpty;

        if(isEmpty) {
            return <div className='experienceContainer shadow' style={{flexDirection: 'column' ,justifyContent: 'center',
            alignItems: 'center'}}>
            <h5 style={{"color": "#1072EB"}}>Experience</h5>
            <Divider color='skyblue'/>
            <p>You have not added any experience</p>
        </div>
        }
        const experienceList = this.props.data;
        return (
            <div className='experienceContainer shadow'>
               <div className='educationContainerTitle'>
                    <h6 style={{"color": "#1072EB"}}>Experience</h6>
                    <Button size='small' onClick={this.handleModalOpen.bind(this)}>
                        <EditIcon size='small' />
                    </Button>
                </div>
                <Divider color='skyblue'/>
                {experienceList.map(experience => this.renderExperience(
                    experience.company,
                    experience.designation
                ))}
                <ExperienceListingModal 
                open={this.state.modalOpen}
                close={this.handleModalClose.bind(this)}
                list={experienceList}
                />
            </div>
        )
    }
}

export default ExperienceTab;