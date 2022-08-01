import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import * as actions from '../../actions';
import './styles.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0.8)',
  width: 'fit-content',
  height: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid white',
  borderRadius: '15px',
  boxShadow: '2px 2px #1072EB',
  p: 4,
};

class ExperienceModal extends Component {

    constructor(props) {
      super(props);
      this.state ={organization: this.props.data ? this.props.data.organization : '',
       id: this.props.data ? this.props.data.id : '',
       position: this.props.data ? this.props.data.position : '',
       desc: this.props.data ? this.props.data.desc : '',
       start_year: this.props.data ? new Date(this.props.data.start_data) : '',
       skill: '',
       skills:  this.props.data ? this.props.data.skills : [],
       end_year: '',
       current: true, 
       industry: this.props.data ? this.props.data.industry :'industry',
       department: this.props.data ? this.props.data.department :'department',
       typeOfExperience: 'fullTime'}
       console.log('Constructor')
    }

    addCoreSkill(event) {
        event.preventDefault();
        const skill = this.state.skill;
        const coreSkills = this.state.skills;
        coreSkills.push(skill);
        this.setState({skill: ''})
        this.setState({skills: coreSkills});

    }

    submitExperience() {
        if(this.props.edit) {
            this.props.updateExperienceInfo({
                value: {
                    id: this.state.id,
                    company: this.state.organization,
                    designation: this.state.position,
                    typeOfExperience: this.state.typeOfExperience,
                    desc: this.state.desc,
                    startDate: this.state.start_year,
                    endDate: this.state.end_year,
                    skills: this.state.skills,
                    industry: this.state.industry,
                    department: this.state.department
                }     
            })
            .then(res => {
                this.props.fetchExperience();
                this.props.close();
            });
        }
        else {
            this.props.sendExperienceInfo({          
                value: {
                    company: this.state.organization,
                    designation: this.state.position,
                    typeOfExperience: this.state.typeOfExperience,
                    desc: this.state.desc,
                    startDate: this.state.start_year,
                    endDate: this.state.end_year,
                    skills: this.state.skills,
                    industry: this.state.industry,
                    department: this.state.department
                }      
            })
            .then(res => {
                this.props.fetchExperience();
                this.props.close();
            });
        }
        
    }

    handleExperienceTypeChange(event) {
        this.setState({typeOfExperience: event.target.value})
    }

    handleIndustryChange(event) {
        this.setState({industry: event.target.value})
    }

    handleDepartmentChange(event) {
        this.setState({department: event.target.value})
    }

    render() {  
      return (<div>
            <Modal
              open={this.props.open}
              onClose={this.props.close}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className='form_container'>
                  <div className='form_title'>
                      <h5>Add Experience data</h5>
                  </div>
                  <div className="row">
                      <form className="col s16 formContent">
                          <div className='inputBoxColumn'>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Organization
                                </div>
                                <div className='formInput'>
                                    <input 
                                        placeholder="Enter organization name"
                                        value={this.state.organization}
                                        onChange={ e => this.setState({ organization: e.target.value })}
                                    />    
                                </div>                    
                            </div>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Type of Experience
                                </div>
                                <div className='formInput'>
                                    <Select
                                    id="experienceTypeSelect"
                                    value={this.state.typeOfExperience}
                                    fullWidth
                                    variant="outlined"
                                    onChange={this.handleExperienceTypeChange.bind(this)}
                                    >
                                        <MenuItem value={'fullTime'}>Full Time</MenuItem>
                                        <MenuItem value={'partTime'}>Part Time</MenuItem>
                                        <MenuItem value={'Intern'}>Inter</MenuItem>
                                    </Select>  
                                </div>                    
                            </div>
                          </div>
                          <div className='inputBoxColumn'>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Designation
                                </div>
                                <div className='formInput'>
                                    <input 
                                        placeholder="Enter your designation"
                                        value={this.state.position}
                                        onChange={ e => this.setState({ position: e.target.value })}
                                    />    
                                </div>                    
                            </div>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    About the job
                                </div>
                                <div className='formInput'>
                                    <input 
                                        placeholder="Give a brief about your job"
                                        value={this.state.desc}
                                        onChange={ e => this.setState({ desc: e.target.value })}
                                    />    
                                </div>                    
                            </div>
                          </div>
                          <div className='inputBoxColumn'>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Start Year
                                </div>
                                <div className='formInput'>
                                    <Datepicker selected={this.state.start_year} onChange={(date) => this.setState({ start_year: date})} 
                                      dateFormat='dd/MM/yyyy' isClearable showYearDropdown scrollableYearDropdown placeholderText="DD/MM/YYYY"
                                    />   
                                </div>                    
                            </div>
                            {this.state.current && <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Currently Working
                                </div>
                                <div className='formInput'>
                                    <button className="small btn" style={{'margin-right': '2rem'}} onClick={(event) => { event.preventDefault(); this.setState({current: true})}}>Yes</button>
                                    <button className="small btn" onClick={(event) => { event.preventDefault(); this.setState({current: false})}}>No</button>
                                </div>                    
                            </div>}
                            {!this.state.current && <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    End Year
                                </div>
                                <div className='formInput'>
                                    <input 
                                        placeholder="Enter your designation"
                                        value={this.state.end_year}
                                        onChange={ e => this.setState({ end_year: e.target.value })}
                                    />    
                                </div>                    
                            </div>}
                          </div>
                          <div className="form_inputBox input-field" style={{width: '22rem'}}>
                              <div>
                                  Skills
                              </div>
                              <div>
                                  <input
                                      placeholder="Add Skills used one by one "
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
                          <div className="form_inputBox input-field" style={{width: '22rem'}}>
                              <div className='formLabel_title'>
                                  Industry And Department
                              </div>
                              <div className='industryAndDepartmentSelect'>
                                  <Select
                                      id="industrySelect"
                                      value={this.state.industry}
                                      fullWidth
                                      variant="outlined"
                                      onChange={this.handleIndustryChange.bind(this)}
                                  >
                                      <MenuItem value={'industry'}>Industry</MenuItem>
                                      <MenuItem value={'IT'}>IT</MenuItem>
                                  </Select>
                                  <div style={{'margin': '1rem'}}/>
                                  <Select
                                      id="genderSelect"
                                      value={this.state.department}
                                      fullWidth
                                      variant="outlined"
                                      onChange={this.handleDepartmentChange.bind(this)}
                                  >
                                      <MenuItem value={'department'}>Department</MenuItem>
                                      <MenuItem value={'Front End'}>Front End</MenuItem>
                                      <MenuItem value={'Back End'}>Back End</MenuItem>
                                      <MenuItem value={'Full Stack'}>Full Stack</MenuItem>
                                      <MenuItem value={'Data Engineering'}>Data Engineering</MenuItem>
                                      <MenuItem value={'Data Science'}>Data Science</MenuItem>
                                  </Select>
                              </div>                    
                          </div>
                          <div className='btnOption'>
                            <Button variant='contained' size='medium' onClick={this.submitExperience.bind(this)}>
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
};

export default connect(null, actions)(ExperienceModal);