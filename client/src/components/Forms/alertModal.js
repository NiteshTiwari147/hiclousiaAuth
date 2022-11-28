import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import * as actions from '../../actions';
import { skills } from '../../constants/skills'
import './styles.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.9)',
    width: 'fit-content',
    height: 'fit-content',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid white',
    borderRadius: '15px',
    boxShadow: '2px 2px #1072EB',
    p: 4,
};

const res = new Set();

class AlertModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skillSubmit: false,
            showSkillList: false,
            selectedSkill: []
        }
    }

    handleSelectedOption(event) {
        let newSkillList = this.state.selectedSkill;
        newSkillList.push(skills[event]);
        this.setState({selectedSkill: newSkillList});
    }

    showSelect(params) {
        res.clear();
        const final = params?.InputProps?.startAdornment || [];
        final.map(o => {
           if(this.state.selectedSkill.includes(o.props.label)) {
                res.add(o.props.label);
            }
        });
    }

    submitForm() {
        const expFormData = this.props.data.value;
        this.props.sendExperienceInfo({
            value: { expFormData, res }
        })
        .then( () => {
            const type = expFormData.typeOfExperience === 'fullTime' ? 'industry': 'intern'
            this.props.sendSkillList({
                value: {
                    skillList: Array.from(res),
                    typeOfProject: type,
                    duration: expFormData.duration,
                }
            })
        })
        .then( res => {
            this.props.fetchSkillSet();
            this.props.fetchExperience();
            this.props.closeParent();
            this.props.close();
        })
    }

    handleProjectForm() {
        const expFormData = this.props.data.value;
        this.props.sendExperienceInfo({
            value: { expFormData, res }
        })
        .then( () => {
            this.props.fetchExperience();
            this.props.openProject();
        })
    }

    hadleSkillForm() {
        this.setState({showSkillList: true})
    }
    render () {
        return (
            <div>
                <Modal
                    open={this.props.open}
                    onClose={this.props.close}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {!this.state.showSkillList && <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                            <h5>Would you like to add relevant project to this experience ?</h5>
                            <p style={{color: 'orange',marginTop: '0rem !important'}}>Note : Adding projects helps you to improve your profile score and showcase your skill expertise</p>
                            <div>
                                <Button style={{marginRight: '1rem'}} variant='contained' onClick={this.handleProjectForm.bind(this)} color='success'>
                                    Yes
                                </Button>
                                <Button variant='contained' color='error' onClick={this.hadleSkillForm.bind(this)}>
                                    No
                                </Button>
                            </div>
                        </div>}
                        {this.state.showSkillList && <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                            <h5>Please add all the skills used in this experience</h5>
                            <div style={{width: '20rem', marginTop: '1rem'}}>
                                <Autocomplete
                                    multiple
                                    id="skill adder"                                 
                                    onChange={(event) => {
                                        console.log(event);
                                        this.handleSelectedOption(event.target.dataset.optionIndex);
                                    }}
                                    options={skills.map((option) => option)}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => {
                                        this.showSelect({...params})
                                        return <TextField {...params} label="Skill" />
                                    }}
                                />
                            </div>
                            <Button style={{marginTop: '1rem'}} variant='contained' color='error' onClick={this.submitForm.bind(this)}>
                                Save
                            </Button>
                        </div>}
                    </Box>
                </Modal>
            </div>
        )
    }
}

export default connect(null, actions)(AlertModal);