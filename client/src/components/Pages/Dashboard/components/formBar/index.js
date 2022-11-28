import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import ProjectModal from "../../../../Forms/projectModal";

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
        const { skillSet } = this.props;
        if(skillSet) {
            return(
                <div className="pageBarContainer shadow">
                    <div style={{fontSize: '20px',color: '#1072EB', fontWeight: 'bold'}}>Projects :</div>
                    <ProjectModal addMore={this.handleAddMoreProject.bind(this)} open={this.state.projectModalOpen} close={this.handleProjectModalClose.bind(this)} skillData={this.props.skillSet ? this.props.skillSet.processedSKillList : []}/>
                    <Button  style={{marginBottom: '0.5rem'}} variant="contained" color='success' size='small' onClick={this.handleProjectModalOpen.bind(this)}>
                        <AddIcon  />
                    </Button>   
                </div>
            )  
        } else {
            return <div className="pageBarContainer shadow">Please add skills</div>
        }
    }
}

function mapStateToProps({auth, candidate, skillSet}) {
    return { auth, candidate, skillSet }
}

export default connect(mapStateToProps)(FormBar);