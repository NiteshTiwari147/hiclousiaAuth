import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import * as actions from '../../actions';
import { jobCategory } from '../../constants/jobCategoryAndPositions'
import './styles.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.8)',
    width: '60%',
    height: '100%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid white',
    borderRadius: '15px',
    boxShadow: '2px 2px #1072EB',
    p: 4
};

class ProjectModal extends Component {
    constructor(props) {
      super(props);
      this.state = { tittle: '', desc: '', start_year: '',skill: '',skills: [], end_year: '',
      industry: 'industry', department: 'department', jobRoles: [],  typeOfProject: 'industry'}
    }

    submitProject() {
        this.props.sendProjectInfo({          
            value: {
                title: this.state.tittle,
                desc: this.state.desc,
                typeOfProject: this.state.typeOfProject,
                startDate: this.state.start_year,
                endDate: this.state.end_year,
                skills: this.state.skills,
                industry: this.state.industry,
                department: this.state.department
            }      
        })
        .then(res => {
            this.setState({tittle: '', desc: '', start_year: '',skill: '',skills: [], end_year: '',
            industry: 'industry', department: 'department', jobRoles: [],  typeOfProject: 'industry'})
            this.props.fetchProject();
            this.props.close();
        });
    }

    handleProjectTypeChange(event) {
        this.setState({typeOfProject: event.target.value})
    }

    handleIndustryChange(event) {
        this.setState({industry: jobCategory[event].title,
            jobRoles: jobCategory[event].roles})
    }

    handleDepartmentChange(event) {
        this.setState({department: this.state.jobRoles[event]})
    }

    addCoreSkill(event) {
        event.preventDefault();
        const skill = this.state.skill;
        const coreSkills = this.state.skills;
        coreSkills.push(skill);
        this.setState({skill: ''})
        this.setState({skills: coreSkills});
    }



    render() {
        return(<div>
          <Modal
            open={this.props.open}
            onClose={this.props.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className='form_container'>
                <div className='form_title'>
                    <h4 style={{fontWeight: 1000}}>Add Project data</h4>
                </div>
                <div className="row">
                    <form className="col s16 formContent">
                      <div className='inputBoxColumn' style={{width: '77%'}}>
                        <div className="form_inputBox input-field" >
                            <div className='formLabel_title'>
                                Title
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter project title"
                                    value={this.state.tittle}
                                    onChange={ e => this.setState({ tittle: e.target.value })}
                                />    
                            </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Type of project
                            </div>
                            <div className='formInput'>
                                <Select
                                id="experienceTypeSelect"
                                value={this.state.typeOfProject}
                                fullWidth
                                variant="outlined"
                                onChange={this.handleProjectTypeChange.bind(this)}
                                >
                                    <MenuItem value={'industry'}>Industry</MenuItem>
                                    <MenuItem value={'intern'}>Intern</MenuItem>
                                    <MenuItem value={'self'}>Self</MenuItem>
                                </Select>  
                            </div>                    
                        </div>
                      </div>
                      <div className='inputBoxColumn' style={{width: '77%'}}>
                        <div className="form_inputBox input-field" style={{width: '100%'}}>
                            <div className='formLabel_title' >
                                Description
                            </div>
                            <div className='formInput'>
                                <TextField
                                    id="outlined-multiline-static"
                                    fullWidth  
                                    multiline
                                    rows={4}
                                    onChange={ e => this.setState({ desc: e.target.value })}
                                    defaultValue={this.state.desc}
                                />
                            </div>                         
                        </div>
                      </div>
                      <div className='inputBoxColumn'>
                        <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Start Date
                                </div>
                                <div className='formInput'>
                                    <Datepicker selected={this.state.start_year} onChange={(date) => this.setState({ start_year: date})} 
                                    dateFormat='dd/MM/yyyy' isClearable showYearDropdown scrollableYearDropdown placeholderText="DD/MM/YYYY"
                                    />
                                </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                End Date
                            </div>
                            <div className='formInput'>
                                <Datepicker selected={this.state.end_year} onChange={(date) => this.setState({ end_year: date})} 
                                    dateFormat='dd/MM/yyyy' isClearable showYearDropdown scrollableYearDropdown placeholderText="DD/MM/YYYY"
                                />    
                            </div>                    
                        </div>
                      </div>
                      <div className="form_inputBox input-field" style={{width: '77%'}}>
                            <div>
                                Skills
                            </div>
                            <div>
                                <input
                                    placeholder="Add core Skill "
                                    value={this.state.skill}
                                    onChange={ e => this.setState({ skill: e.target.value })}
                                />
                                <div className='skill_options'>
                                    <button className="small btn" onClick={this.addCoreSkill.bind(this)}>Add</button>
                                    <div className='addedSkill'>
                                        {this.state.skills && this.state.skills.map( skill => <p style={{'margin-left': '1rem'}}>{skill}</p>)}
                                    </div>        
                                </div>                               
                            </div>
                        </div>
                        <div className="form_inputBox input-field" style={{width: '77%'}}>
                            <div className='formLabel_title'>
                                Industry And Department
                            </div>
                            <div className='industryAndDepartmentSelect'>
                            <Autocomplete
                                id="free-solo-demo"
                                fullWidth
                                onChange={(event) => {
                                    this.handleIndustryChange(event.target.dataset.optionIndex);
                                }}
                                options={jobCategory.map((option) => option.title)}
                                renderInput={(params) => <TextField {...params} label="Industry" />}
                            />
                            <div style={{'margin': '1rem'}}/>
                            <Autocomplete
                                id="free-solo-demo"
                                fullWidth
                                onChange={(event) => {
                                    console.log("autocomplete ", event.target.dataset.optionIndex)
                                    this.handleDepartmentChange(event.target.dataset.optionIndex);
                                }}
                                options={this.state.jobRoles.map((option) => option)}
                                renderInput={(params) => <TextField {...params} label="Department" />}
                            />
                            </div>             
                        </div>
                        <div className='btnOption'>
                            <Button variant='contained' size='medium' onClick={this.submitProject.bind(this)}>
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
              </div>
            </Box>
          </Modal>
        </div>    
        )
    }
}

export default connect(null, actions)(ProjectModal);