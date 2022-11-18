import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


import AlertModal from './alertModal';
import ProjectModal from './projectModal';
import MaterialUIPickers from '../utils/calender';
import durationCalculator from '../utils/durationCalculator';
import * as actions from '../../actions';
import { jobCategory } from '../../constants/jobCategoryAndPositions'
import './styles.css';

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
  p: 4,
};

class ExperienceModal extends Component {

    constructor(props) {
      super(props);
      this.state = {
            organization: this.props.data ? this.props.data.organization : '',
            id: this.props.data ? this.props.data.id : '',
            position: this.props.data ? this.props.data.position : '',
            desc: this.props.data ? this.props.data.desc : '',
            start_year: this.props.data ? new Date(this.props.data.start_data) : '',
            skill: '',
            startDate: '',
            endDate: '',
            duration: {},
            childProp: {},
            skills:  this.props.data ? this.props.data.skills : [],
            end_year: '',
            jobRoles: [],
            current: true, 
            industryExperienceYears: 0,
            industryExperienceMonths: 0,
            industry: this.props.data ? this.props.data.industry :'industry',
            department: this.props.data ? this.props.data.department :'department',
            typeOfExperience: 'fullTime',
            alertModalOpen:false,
            projectModalOpen: false
        }
    }

    handleProjectModalOpen() {
        this.setState({alertModalOpen: false})
        this.setState({projectModalOpen: true})
    }

    handleAddMoreProject() {
        this.setState({projectModalOpen: false});
        this.setState({
            organization: '',
            id: '',
            position: '',
            desc: '',
            start_year: '',
            skill: '',
            skills:  [],
            end_year: '',
            jobRoles: [],
            current: false, 
        })
        this.setState({projectModalOpen: true});
    }

    handleProjectModalClose() {
        this.setState({projectModalOpen: false})
        this.setState({
            organization: '',
            id: '',
            position: '',
            desc: '',
            start_year: '',
            skill: '',
            skills:  [],
            end_year: '',
            jobRoles: [],
            current: false, 
            industryExperienceYears: 0,
            industryExperienceMonths: 0,
            industry: 'industry',
            department: 'department',
            typeOfExperience: 'fullTime'
        })
    }

    handleSkillModalOpen() {
        this.setState({skillModalOpen: true})
    }

    handleAlertModalOpen() {
        this.setState({alertModalOpen: true})
    }
    handleAlertModalClose() {
        this.setState({alertModalOpen: false})
        this.setState({
            organization: '',
            id: '',
            position: '',
            desc: '',
            start_year: '',
            skill: '',
            skills:  [],
            end_year: '',
            jobRoles: [],
            current: false, 
            industryExperienceYears: 0,
            industryExperienceMonths: 0,
            industry: 'industry',
            department: 'department',
            typeOfExperience: 'fullTime'
        })
        this.props.close();
    }

    handleIndustryExperienceYearsChange(event) {
        this.setState({industryExperienceYears: event.target.value})
    }

    handleIndustryExperienceMonthsChange(event) {
        this.setState({industryExperienceMonths: event.target.value})
    }

    renderExperienceYears() {
        const years = new Array(50).fill(0);
        return years.map( (year,index) => <MenuItem value={index}>{index}</MenuItem>)
    }

    renderExperienceMonths() {
        const months = new Array(12).fill(0);
        return months.map( (month,index) => <MenuItem value={index}>{index}</MenuItem>)
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
                    isCurrent: this.state.current,
                    industryExperience: {
                        yr: this.state.industryExperienceYears,
                        mo: this.state.industryExperienceMonths
                    },
                    skills: this.state.skills,
                    industry: this.state.industry,
                    department: this.state.department
                }     
            })
            .then(res => {
                this.setState({
                organization: '',
                id: '',
                position: '',
                desc: '',
                start_year: '',
                skill: '',
                skills:  [],
                end_year: '',
                jobRoles: [],
                current: false, 
                industryExperienceYears: 0,
                industryExperienceMonths: 0,
                industry: 'industry',
                department: 'department',
                typeOfExperience: 'fullTime'})
                this.props.fetchExperience();
                this.props.close();
            });
        }
        else {
            this.handleAlertModalOpen();
            const valueObj = {
                value: {
                    company: this.state.organization,
                    designation: this.state.position,
                    typeOfExperience: this.state.typeOfExperience,
                    isCurrent: this.state.current,
                    duration: this.state.duration,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    industry: this.state.industry,
                    department: this.state.department
                }
            }
            this.setState({childProp: valueObj});
        }
        
    }

    calculateExpDuration() {
        this.state.endDate = dayjs(this.state.endDate).format('YYYY-MM-DD');
        this.state.startDate = dayjs(this.state.startDate).format('YYYY-MM-DD');
        const date1 = dayjs(this.state.endDate);
        const date2 = dayjs(this.state.startDate);
        this.setState({duration: durationCalculator(date1.diff(date2))});
        console.log(this.state.endDate, this.state.startDate, durationCalculator(date1.diff(date2)));
    }

    handleStartDateChange(value) {
        this.setState({startDate: value});
    }

    handleEndDateChange(value) {
        this.setState({endDate: value});
        setTimeout(() =>this.calculateExpDuration(), 2000);
    }

    handleExperienceTypeChange(event) {
        this.setState({typeOfExperience: event.target.value})
    }

    handleIndustryChange(event) {
        this.setState({industry: jobCategory[event].title,
            jobRoles: jobCategory[event].roles})
    }

    handleDepartmentChange(event) {
        this.setState({department: this.state.jobRoles[event]})
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
                    <form className="col s16 formContent">
                        <div className='inputBoxColumn' style={{width: '80%'}}>
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
                                        <MenuItem value={'intern'}>Intern</MenuItem>
                                    </Select>  
                                </div>                    
                            </div>
                        </div>
                        <div className='inputBoxColumn' style={{width: '80%'}}>
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
                        </div>
                        <div className='inputBoxColumn' style={{width: '80%'}}>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Start Date
                                </div>
                                <div className='candidateExperienceSelect'>
                                    <MaterialUIPickers setTime={this.handleStartDateChange.bind(this)}/>
                                </div>                  
                            </div>
                            {this.state.current && <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Currently Working
                                </div>
                                <div className='formInput' style={{marginTop: '1rem'}}>
                                    <button className="small btn" style={{'margin-right': '2rem'}} onClick={(event) => { event.preventDefault(); this.setState({current: true})}}>Yes</button>
                                    <button className="small btn" onClick={(event) => { event.preventDefault(); this.setState({current: false})}}>No</button>
                                </div>                    
                            </div>}
                            {!this.state.current && <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    End Date
                                </div>
                                <div className='candidateExperienceSelect'>
                                    <MaterialUIPickers setTime={this.handleEndDateChange.bind(this)}/>
                                </div>
                            </div>}
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
                        <Button variant='contained' size='medium' onClick={this.submitExperience.bind(this)}>
                            Save
                        </Button>
                        </div>
                    </form>
                </div>
                {this.state.alertModalOpen && <AlertModal 
                    data={this.state.childProp}
                    open={this.state.alertModalOpen} 
                    close={this.handleAlertModalClose.bind(this)}
                    openProject={this.handleProjectModalOpen.bind(this)} 
                    closeParent={this.props.close.bind(this)}
                />}
                {this.state.projectModalOpen && <ProjectModal
                    data={this.state.childProp}
                    open={this.state.projectModalOpen} 
                    closeParent={this.props.close.bind(this)}
                    close={this.handleProjectModalClose.bind(this)}
                    addMore={this.handleAddMoreProject.bind(this)} 
                />}
              </Box>
            </Modal>
        </div>
        ) 
    }
};

export default connect(null, actions)(ExperienceModal);