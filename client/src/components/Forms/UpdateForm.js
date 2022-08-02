import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import EducationModal from "./educationModal";
import ProjectModal from "./projectModal";
import ExperienceModal from "./experienceModal";

class UpdateForm extends Component {

    constructor(props){
        super(props);
        this.state = {educationModalOpen: false,experienceModalOpen: false,projectModalOpen: false}
    }

    handleProjectModalOpen() {
        this.setState({projectModalOpen: true})
    }
    handleProjectModalClose() {
        this.setState({projectModalOpen: false})
    }

    handleExperienceModalOpen() {
        this.setState({experienceModalOpen: true})
    }
    handleExperienceModalClose() {
        this.setState({experienceModalOpen: false})
    }

    handleEducationModalOpen() {
        this.setState({educationModalOpen: true})
    }
    handleEducationModalClose() {
        this.setState({educationModalOpen: false})
    }
    render() {
        return (
            <div className='updateForm container'>
                <div className='updateCardContainer shadow'>
                    <Button size='medium' onClick={this.handleEducationModalOpen.bind(this)}>
                        <div style={{fontSize: 'small', fontWeight: 'bold'}}>Add Education</div>
                    </Button>
                    <EducationModal open={this.state.educationModalOpen} close={this.handleEducationModalClose.bind(this)} />
                </div>
                <div className='updateCardContainer shadow'>
                    <Button size='medium' onClick={this.handleExperienceModalOpen.bind(this)}>
                        <div style={{fontSize: 'small', fontWeight: 'bold'}}>Add Experience</div>
                    </Button>
                    <ExperienceModal open={this.state.experienceModalOpen} close={this.handleExperienceModalClose.bind(this)} />
                </div>
                <div className='updateCardContainer shadow'>
                    <Button size='medium' onClick={this.handleProjectModalOpen.bind(this)}>
                        <div style={{fontSize: 'small', fontWeight: 'bold'}}>Add Project</div>
                    </Button>
                    <ProjectModal open={this.state.projectModalOpen} close={this.handleProjectModalClose.bind(this)} />
                </div>
                <div className='updateCardContainer shadow'>
                    <Button size='medium' onClick={this.handleProjectModalOpen.bind(this)}>
                        <div style={{fontSize: 'small', fontWeight: 'bold'}}>Add Certificate</div>
                    </Button>
                    <ProjectModal open={this.state.projectModalOpen} close={this.handleProjectModalClose.bind(this)} />
                </div>
                <div className='updateCardContainer shadow'>
                    <Link to="/dashboard" className='fillBox'>
                            VIEW DASHBOARD
                    </Link>
                </div>
            </div>
        )
    }
}

export default UpdateForm;