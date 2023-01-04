import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';


import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import AlertModal from './alertModal';
import ProjectModal from './projectModal';
import MaterialUIPickers from '../utils/calender';
import durationCalculator from '../utils/durationCalculator';
import * as actions from '../../actions';
import { jobCategory } from '../../constants/jobCategoryAndPositions'
import './styles.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skillStyle = {
    width: '13rem',
    marginBottom: '2rem'
}

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

const dep = new Set();

class ExperienceModal extends Component {

    constructor(props) {
      super(props);
      this.state = {
            organization: this.props.data ? this.props.data.organization : '',
            id: this.props.data ? this.props.data.id : '',
            position: this.props.data ? this.props.data.position : '',
            desc: this.props.data ? this.props.data.desc : '',
            start_year: this.props.data ? new Date(this.props.data.start_data) : '',
            startDate: dayjs(Date.now()).format('YYYY-MM-DD'),
            endDate: dayjs(Date.now()).format('YYYY-MM-DD'),
            duration: { year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0 },
            childProp: {},
            skills:  this.props.skillData || [],
            end_year: '',
            skillUsed: [],
            jobRoles: [],
            current: true, 
            location: '',
            managerName: '',
            managerContact: '',
            industryExperienceYears: 0,
            industryExperienceMonths: 0,
            industry: this.props.data ? this.props.data.industry :'',
            department: this.props.data ? this.props.data.department :'',
            typeOfExperience: 'fullTime',
            alertModalOpen:false,
            projectModalOpen: false,
            isError: false
        }
    }

    isValid(obj) {
        const {value} = obj;
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if(typeof value[key] === 'string' && (value[key]==='' || value[key] == undefined || value[key] == null)) {
                    return false;
                } else if(typeof value[key] === 'object' && value[key].length === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    handleSKillChange(event) {
        const {
            target: { value },
          } = event;
          const res = typeof value === 'string' ? value.split(',') : value
          this.setState({skillUsed: res});
          this.setState({isError: false});
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
        this.setState({isError: false});
    }

    submitExperience() {
        if(this.props.edit) {
            const valueObj = {
                value: {
                    company: this.state.organization,
                    designation: this.state.position,
                    typeOfExperience: this.state.typeOfExperience,
                    isCurrent: this.state.current,
                    duration: this.state.duration,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    skills: this.state.skillUsed,
                }
            }
            if(this.isValid(valueObj)) {
                this.props.updateExperienceInfo({
                    value: {
                        id: this.state.id,
                        company: this.state.organization,
                        designation: this.state.position,
                        typeOfExperience: this.state.typeOfExperience,
                        isCurrent: this.state.current,
                        duration: this.state.duration,
                        startDate: this.state.startDate,
                        skills: this.state.skillUsed,
                        endDate: this.state.endDate,
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
            } else {
                this.setState({isError: true});
            }   
        }
        else {
            const valueObj = {
                value: {
                    company: this.state.organization,
                    designation: this.state.position,
                    typeOfExperience: this.state.typeOfExperience,
                    isCurrent: this.state.current,
                    duration: this.state.duration,
                    industry: this.state.industry,
                    department: this.state.department,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    skills: this.state.skillUsed,
                }
            }
            if(this.isValid(valueObj)) {
                valueObj.value.location = this.state.location;
                valueObj.value.manager = this.state.managerName;
                valueObj.value.managerContact = this.state.managerContact;
                valueObj.value.responsibilty = this.state.desc;
                this.props.sendExperienceInfo(valueObj);
                const type = this.state.typeOfExperience === 'fullTime' ? 'industry': 'intern'
                this.props.sendSkillList({
                    value: {
                        skillList: this.state.skillUsed,
                        typeOfProject: type,
                        duration:this.state.duration,
                    }
                })
                this.props.fetchExperience();
                this.props.close();
            } else {
                this.setState({isError: true});
            }       
        }
        
    }

    calculateExpDuration() {
        this.state.endDate = dayjs(this.state.endDate).format('YYYY-MM-DD');
        this.state.startDate = dayjs(this.state.startDate).format('YYYY-MM-DD');
        const date1 = dayjs(this.state.endDate);
        const date2 = dayjs(this.state.startDate);
        this.setState({duration: durationCalculator(date1.diff(date2))});
    }

    handleStartDateChange(value) {
        this.setState({startDate: value});
        setTimeout(() =>this.calculateExpDuration(), 2000);
        this.setState({isError: false});
    }

    handleEndDateChange(value) {
        this.setState({endDate: value});
        setTimeout(() =>this.calculateExpDuration(), 2000);
        this.setState({isError: false});
    }

    handleExperienceTypeChange(event) {
        this.setState({typeOfExperience: event.target.value})
        this.setState({isError: false});
    }

    handleIndustryChange(event) {
        this.setState({industry: jobCategory[event].title,
            jobRoles: jobCategory[event].roles})
        this.setState({isError: false});
    }

    handleDepartmentChange(event) {
        this.setState({department: this.state.jobRoles[event]})
        this.setState({isError: false});
    }

    showDepartmentSelect(params) {
        dep.clear();
        const final = params?.InputProps?.startAdornment || [];
        final.map(o => {
           if(this.state.department.includes(o.props.label)) {
                dep.add(o.props.label);
            }
        });
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
                    {this.state.isError && <div className='form_title'>
                        <p style={{color: 'red'}}>Please fill correct information</p>
                    </div>}
                    <form className="col s16 formContent">
                        <div className='inputBoxColumn' style={{width: '80%'}}>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Organization
                                    <span style={{color: 'red'}}>*</span>
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
                                    <span style={{color: 'red'}}>*</span>
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
                                    <span>Job Title</span>
                                    <span style={{color: 'red'}}>*</span>
                                </div>
                                <div className='formInput'>
                                    <input 
                                        placeholder="Enter your designation"
                                        value={this.state.position}
                                        onChange={ e => this.setState({ position: e.target.value })}
                                    />    
                                </div>                    
                            </div>
                            {this.state.skills.length>0 && <div className="form_inputBox input-field">
                                    <div className='formLabel_title'>
                                        Skills Used
                                        <span style={{color: 'red'}}>*</span>
                                    </div>
                                    <div>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={this.state.skillUsed}
                                        onChange={this.handleSKillChange.bind(this)}
                                        input={<OutlinedInput label="Tag" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        sx={skillStyle}
                                        >
                                        {this.state.skills.map(({skillName}) => (
                                            <MenuItem key={skillName} value={skillName}>
                                            <Checkbox checked={this.state.skillUsed.indexOf(skillName) > -1} />
                                            <ListItemText primary={skillName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    </div>
                            </div>}
                        </div>
                        <div className='inputBoxColumn' style={{width: '80%'}}>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Start Date
                                    <span style={{color: 'red'}}>*</span>
                                </div>
                                <div className='candidateExperienceSelect'>
                                    <MaterialUIPickers value={this.state.startDate} setTime={this.handleStartDateChange.bind(this)}/>
                                </div>                  
                            </div>
                            {this.state.current && <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Currently Working
                                    <span style={{color: 'red'}}>*</span>
                                </div>
                                <div className='formInput' style={{marginTop: '1rem'}}>
                                    <button className="small btn" style={{'margin-right': '2rem'}} onClick={(event) => { event.preventDefault(); this.setState({current: true})}}>Yes</button>
                                    <button className="small btn" onClick={(event) => { event.preventDefault(); this.setState({current: false})}}>No</button>
                                </div>                    
                            </div>}
                            {!this.state.current && <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    End Date
                                    <span style={{color: 'red'}}>*</span>
                                </div>
                                <div className='candidateExperienceSelect'>
                                    <MaterialUIPickers value={this.state.endDate} setTime={this.handleEndDateChange.bind(this)}/>
                                </div>
                            </div>}
                        </div>
                        <div className='inputBoxColumn' style={{'flex-direction': 'column', 'align-items': 'flex-start', width: '75%'}}>
                            <h6>Select relevant industry and department sector <span style={{color: 'red'}}>*</span></h6>
                            <div className='industryAndDepartmentSelect' style={{marginLeft: '0rem', width: '100%'}}>
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
                                    id="department-adder"
                                    fullWidth
                                    onChange={(event) => {
                                        this.handleDepartmentChange(event.target.dataset.optionIndex);
                                    }}
                                    options={this.state.jobRoles.map((option) => option)}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => {
                                        this.showDepartmentSelect({...params})
                                        return <TextField {...params} label="Department" />
                                    }}
                                />
                            </div>
                        </div>
                        <div className='inputBoxColumn' style={{width: '80%'}}>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Location
                                </div>
                                <div className='formInput'>
                                    <input 
                                        placeholder="Enter your designation"
                                        value={this.state.location}
                                        onChange={ e => this.setState({ location: e.target.value })}
                                    />    
                                </div>                    
                            </div>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Reporting Person
                                </div>
                                <div className='formInput'>
                                    <input 
                                        placeholder="Enter your manager name"
                                        value={this.state.managerName}
                                        onChange={ e => this.setState({ managerName: e.target.value })}
                                    />    
                                </div>                    
                            </div>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Reporting person contact
                                </div>
                                <div className='formInput'>
                                    <input 
                                        placeholder="Enter your manager contact"
                                        value={this.state.managerContact}
                                        onChange={ e => this.setState({ managerContact: e.target.value })}
                                    />    
                                </div>                    
                            </div>
                        </div>
                        <div className='inputBoxColumn' style={{width: '80%'}}>
                            <div className="form_inputBox input-field" style={{width: '100%'}}>
                                <div className='formLabel_title' >
                                    Responsibilities
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

function mapStateToProps({auth, candidate, skillSet}) {
    return { auth, candidate, skillSet }
}

export default connect(mapStateToProps, actions)(ExperienceModal);