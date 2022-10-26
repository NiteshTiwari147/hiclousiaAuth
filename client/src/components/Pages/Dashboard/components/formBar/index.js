import React, { Component } from "react";
import Button from '@mui/material/Button';

import EducationModal from "../../../../Forms/educationModal";
import ProjectModal from "../../../../Forms/projectModal";
import ExperienceModal from "../../../../Forms/experienceModal";
import SkillFormModal from "../../../../Forms/SkillFormModal";

import './styles.css';

class FormBar extends Component {
    constructor(props){
        super(props);
        this.state = {educationModalOpen: false,
            experienceModalOpen: false,
            projectModalOpen: false,
            skillModalOpen: false
        }
    }

    handleProjectModalOpen() {
        this.setState({projectModalOpen: true})
    }

    handleSkillModalOpen() {
        this.setState({skillModalOpen: true})
    }

    handleSkillModalClose() {
        this.setState({skillModalOpen: false})
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
        return(
            <div className="pageBarContainer shadow">
                <Button size='medium' onClick={this.handleEducationModalOpen.bind(this)}>
                    <div style={{fontSize: 'small', fontWeight: 'bold'}}>Add Education</div>
                </Button>
                <EducationModal open={this.state.educationModalOpen} close={this.handleEducationModalClose.bind(this)} />
                <Button size='medium' onClick={this.handleExperienceModalOpen.bind(this)}>
                    <div style={{fontSize: 'small', fontWeight: 'bold'}}>Add Experience</div>
                </Button>
                <ExperienceModal open={this.state.experienceModalOpen} close={this.handleExperienceModalClose.bind(this)} />
                <Button size='medium' onClick={this.handleProjectModalOpen.bind(this)}>
                    <div style={{fontSize: 'small', fontWeight: 'bold'}}>Add Project</div>
                </Button>
                <ProjectModal open={this.state.projectModalOpen} close={this.handleProjectModalClose.bind(this)} />
                <Button size='medium' onClick={this.handleSkillModalOpen.bind(this)}>
                    <div style={{fontSize: 'small', fontWeight: 'bold'}}>Add Skill</div>
                </Button>
                <SkillFormModal skillList={this.props.skillList ? this.props.skillList : []} open={this.state.skillModalOpen} close={this.handleSkillModalClose.bind(this)} />
            </div>
        )
    }
}

export default FormBar;