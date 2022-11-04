import React, { Component } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

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

    handleAddMoreProject() {
        this.setState({projectModalOpen: false});
        this.setState({projectModalOpen: true});
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
                <div style={{fontSize: '20px',color: '#1072EB', fontWeight: 'bold'}}>Projects :</div>
                <ProjectModal addMore={this.handleAddMoreProject.bind(this)} open={this.state.projectModalOpen} close={this.handleProjectModalClose.bind(this)} />
                <Button  style={{marginBottom: '0.5rem'}} variant="contained" color='success' size='small' onClick={this.handleProjectModalOpen.bind(this)}>
                    <AddIcon  />
                </Button>   
            </div>
        )
    }
}

export default FormBar;