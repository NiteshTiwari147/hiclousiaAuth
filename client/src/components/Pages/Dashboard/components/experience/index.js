import React, { Component } from 'react';
import { connect } from 'react-redux';
import BusinessIcon from '@mui/icons-material/Business';
import Divider from '@mui/material/Divider';
import Button from  '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import ExperienceListingModal from './listingModal';
import ExperienceModal from '../../../../Forms/experienceModal';

import './styles.css';

class ExperienceTab extends Component {

    constructor(props) {
        super(props);
        this.state = { experienceModalOpen: false,
        modalOpen: false}
    };

    handleExperienceModalOpen() {
        this.setState({experienceModalOpen: true})
    }
    handleExperienceModalClose() {
        this.setState({experienceModalOpen: false})
    }

    handleModalOpen() {
        this.setState({modalOpen: true})
    }

    handleModalClose() {
        this.setState({modalOpen: false})
    }

    renderExperience(start_date, end_date, company, designation) {
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
                    {start_date} to {end_date}
                </div>
            </div>
            </div>
            <Divider color='skyblue'/>
        </div>
    }
    render() {
        const isEmpty = this.props.isEmpty;
        const isHR = this.props.isHR || false;
        if(isEmpty) {
            return <div className='experienceContainer shadow' style={{flexDirection: 'column' ,justifyContent: 'center',
            alignItems: 'center'}}>
            <h5 style={{"color": "#1072EB"}}>Experience</h5>
            <Divider color='skyblue'/>
            <div style={{marginTop: '1rem'}}>
                <Button variant='contained' color='success' size='small' onClick={this.handleExperienceModalOpen.bind(this)}>
                     Please add experience
                </Button>
            </div>
            <ExperienceModal open={this.state.experienceModalOpen} close={this.handleExperienceModalClose.bind(this)} skillData={this.props.skillSet ? this.props.skillSet.processedSKillList : []}/>
        </div>
        } else if(isHR) {
            const experienceList = this.props.data;
            console.log("tab ", experienceList);
            return (
                <div className='experienceContainer shadow'>
                <div className='educationContainerTitle'>
                        <h6 style={{"color": "#1072EB"}}>Experience</h6>
                        {/* <Button size='small' onClick={this.handleModalOpen.bind(this)}>
                            <EditIcon size='small' />
                        </Button> */}
                    </div>
                    <Divider color='skyblue'/>
                    {experienceList.map(experience => this.renderExperience(
                        experience.startDate,
                        experience.endDate,
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
        else {
            const experienceList = this.props.data;
            console.log("tab ", experienceList);
            return (
                <div className='experienceContainer shadow'>
                <div className='educationContainerTitle'>
                        <h6 style={{"color": "#1072EB"}}>Experience</h6>
                        {/* <Button size='small' onClick={this.handleModalOpen.bind(this)}>
                            <EditIcon size='small' />
                        </Button> */}
                    </div>
                    <Divider color='skyblue'/>
                    {experienceList.map(experience => this.renderExperience(
                        experience.startDate,
                        experience.endDate,
                        experience.company,
                        experience.designation
                    ))}
                    <ExperienceListingModal 
                    open={this.state.modalOpen}
                    close={this.handleModalClose.bind(this)}
                    list={experienceList}
                    />
                    <div style={{marginTop: '1rem'}}>
                        <Button variant='contained' color='success' size='medium' onClick={this.handleExperienceModalOpen.bind(this)}>
                            Add Experience
                        </Button>
                    </div>
                    <ExperienceModal open={this.state.experienceModalOpen} close={this.handleExperienceModalClose.bind(this)} skillData={this.props.skillSet ? this.props.skillSet.processedSKillList : []} />
                </div>
            )
        } 
    }
}

function mapStateToProps({auth, candidate, skillSet}) {
    return { auth, candidate, skillSet }
}

export default connect(mapStateToProps)(ExperienceTab);