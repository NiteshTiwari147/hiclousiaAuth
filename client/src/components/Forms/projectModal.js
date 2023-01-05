import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import * as actions from '../../actions';
import MaterialUIPickers from '../utils/calender';
import durationCalculator from '../utils/durationCalculator';
import { skills } from '../../constants/skills'
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
    p: 4
};

const res = new Set();
const dep = new Set();

class ProjectModal extends Component {
    constructor(props) {
      super(props);
      this.state = { fromExp: false,tittle: '', desc: '', startDate: dayjs(Date.now()).format('YYYY-MM-DD'),duration: { year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0 },
        endDate: dayjs(Date.now()).format('YYYY-MM-DD'),industry: '',
        department: '', jobRoles: [],  typeOfProject: 'industry', skillUsed: [], isError: false,
        skills:  this.props.skillData || [], result: '',location: '', managerName: '', managerContact: '',} 
    }

    handleSKillChange(event) {
        const {
            target: { value },
          } = event;
          const res = typeof value === 'string' ? value.split(',') : value
          this.setState({skillUsed: res});
          this.setState({isError: false});
    }

    isValid(obj) {
        const {value} = obj;
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if(typeof value[key] === 'string' && (value[key]==='' || value[key] == undefined || value[key] == null)) {
                    console.log(key, value[key]);
                    return false;
                } else if(typeof value[key] === 'object' && value[key].length === 0) {
                    console.log(key, value[key]);
                    return false;
                }
            }
        }
        return true;
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
    }

    handleEndDateChange(value) {
        this.setState({endDate: value});
        setTimeout(() =>this.calculateExpDuration(), 2000);
    }

    componentDidMount() {
        if(this.props.data?.value?.typeOfExperience) {
            this.setState({fromExp: true});
            this.setState({industry: this.props.data.value.industry});
            this.setState({department: this.props.data.value.department});
           
            if(this.props.data.value.typeOfExperience === 'intern') {
                this.setState({typeOfProject: 'intern'});
            }
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

    addMoreProject() {
        const obj = {
            value: {
                title: this.state.tittle,
                desc: this.state.desc,
                typeOfProject: this.state.typeOfProject,
                duration: this.state.duration,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                selectedSkill: this.state.skillUsed,
            }
        }
        if(this.isValid(obj)) {
            this.props.sendProjectInfo(obj)
            .then( _ => {
            this.props.sendSkillList({
                value: {
                    skillList: this.state.skillUsed,
                    typeOfProject: this.state.typeOfProject,
                    duration: this.state.duration,
                }
            })
            })
            .then( _ => {
                this.props.fetchSkillSet();
                this.setState({ tittle: '', desc: '', startDate: Date.now(),duration: {}, endDate: Date.now(),
                jobRoles: [], skillUsed: [], isError: false})
                this.props.fetchProject();
                this.props.addMore();
            })
        }
        
    }

    submitProject() {
        const obj = {
            value: {
                title: this.state.tittle,
                desc: this.state.desc,
                outcomes: this.state.result,
                typeOfProject: this.state.typeOfProject,
                industry: this.state.industry,
                department: this.state.department,
                duration: this.state.duration,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                selectedSkill: this.state.skillUsed
            }
        }
        if(this.isValid(obj)) {
            console.log(obj, this.state);
            obj.value.location = this.state.location;
            obj.value.manager = this.state.managerName;
            obj.value.managerContact = this.state.managerContact;
            this.props.sendProjectInfo(obj)
            this.setState({ tittle: '', desc: '', startDate: '',duration: {}, endDate: '',result: '',location: '', 
            industry: 'industry', department: 'department', jobRoles: [],  typeOfProject: 'industry', skillUsed: [], manager: '',managerContact: ''});
            this.props.close();
            this.props.fetchProject();
        } else {
            this.setState({isError: true})
        }
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

    showDepartmentSelect(params) {
        dep.clear();
        const final = params?.InputProps?.startAdornment || [];
        final.map(o => {
           if(this.state.selectedDepartment.includes(o.props.label)) {
                dep.add(o.props.label);
            }
        });
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
                      <div className='inputBoxColumn' style={{width: '100%'}}>
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
                      <div className='inputBoxColumn' style={{width: '100%'}}>
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
                      <div className='inputBoxColumn' style={{width: '100%'}}>
                        <div className="form_inputBox input-field" style={{width: '100%'}}>
                            <div className='formLabel_title' >
                                Outcomes
                            </div>
                            <div className='formInput'>
                                <TextField
                                    id="outlined-multiline-static"
                                    fullWidth  
                                    multiline
                                    rows={4}
                                    onChange={ e => this.setState({ result: e.target.value })}
                                    defaultValue={this.state.result}
                                />
                            </div>                         
                        </div>
                      </div>
                      <div className='inputBoxColumn' style={{width: '100%'}}>
                        <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Start Date
                                </div>
                                <div className='formInput'>
                                    <MaterialUIPickers value={this.state.startDate} setTime={this.handleStartDateChange.bind(this)}/>
                                </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                End Date
                            </div>
                            <div className='formInput'>
                                <MaterialUIPickers value={this.state.endDate} setTime={this.handleEndDateChange.bind(this)}/>   
                            </div>                    
                        </div>
                      </div>
                      <div className='inputBoxColumn' style={{'flex-direction': 'column', 'align-items': 'flex-start', width: '95%'}}>
                            <h6>Select relevant industry and department sector</h6>
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
                      {this.state.skills.length>0 && <div className="form_inputBox input-field" style={{width: '95%'}}>
                            <div className='formLabel_title'>
                                Skills Used
                            </div>
                            <div>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                fullWidth
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
                        <div className='inputBoxColumn' style={{width: '100%'}}>
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
                                    Contact
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
                        <div className='btnOption'>
                            {/* <Button variant='contained' size='medium' onClick={this.addMoreProject.bind(this)}>
                                Add More
                            </Button>
                            <div style={{marginRight: '1rem'}} /> */}
                            <Button variant='contained' size='medium' onClick={this.submitProject.bind(this)}>
                                Save
                            </Button>
                        </div>
                        {this.state.isError && <div className='form_title'>
                            <p style={{color: 'red'}}>Please fill correct information</p>
                        </div>}
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