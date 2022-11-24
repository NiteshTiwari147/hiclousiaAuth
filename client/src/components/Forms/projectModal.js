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
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import * as actions from '../../actions';
import MaterialUIPickers from '../utils/calender';
import durationCalculator from '../utils/durationCalculator';
import { skills } from '../../constants/skills'
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

const res = new Set();

class ProjectModal extends Component {
    constructor(props) {
      super(props);
      this.state = { fromExp: false,tittle: '', desc: '', startDate: Date.now(),duration: {}, endDate: Date.now(),
      industry: '', department: '', jobRoles: [],  typeOfProject: 'industry', selectedSkill: [], isError: false}
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
                industry: this.state.industry,
                selectedSkill: Array.from(res),
                department: this.state.department
            }
        }
        if(this.isValid(obj)) {
            this.props.sendProjectInfo(obj)
            .then( _ => {
            this.props.sendSkillList({
                value: {
                    skillList: Array.from(res),
                    typeOfProject: this.state.typeOfProject,
                    duration: this.state.duration,
                }
            })
            })
            .then( _ => {
                this.props.fetchSkillSet();
                this.setState({ tittle: '', desc: '', startDate: Date.now(),duration: {}, endDate: Date.now(),
                jobRoles: [], selectedSkill: [], isError: false})
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
                typeOfProject: this.state.typeOfProject,
                duration: this.state.duration,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                industry: this.state.industry,
                selectedSkill: Array.from(res),
                department: this.state.department
            }
        }
        if(this.isValid(obj)) {
            this.props.sendProjectInfo(obj)
            .then( () => {
                this.props.sendSkillList({
                    value: {
                        skillList: Array.from(res),
                        typeOfProject: this.state.typeOfProject,
                        duration: this.state.duration,
                    }
                });
            })
            .then(res => {
                this.props.fetchSkillSet();
                this.setState({ tittle: '', desc: '', startDate: '',duration: {}, endDate: '',
                industry: 'industry', department: 'department', jobRoles: [],  typeOfProject: 'industry', selectedSkill: []})
                if(this.state.fromExp) {
                    this.props.closeParent();
                }
                this.props.close();
                this.props.fetchProject();
            })
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
                      <div className='inputBoxColumn' style={{width: '100%'}}>
                        <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Start Date
                                </div>
                                <div className='formInput'>
                                    <MaterialUIPickers setTime={this.handleStartDateChange.bind(this)}/>
                                </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                End Date
                            </div>
                            <div className='formInput'>
                                <MaterialUIPickers setTime={this.handleEndDateChange.bind(this)}/>   
                            </div>                    
                        </div>
                      </div>
                        <div className="form_inputBox input-field" style={{width: '100%'}}>
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
                        {!this.props.data && <div className="form_inputBox input-field" style={{width: '100%'}}>
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
                        </div>}
                        <div className='btnOption'>
                            <Button variant='contained' size='medium' onClick={this.addMoreProject.bind(this)}>
                                Add More
                            </Button>
                            <div style={{marginRight: '1rem'}} />
                            <Button variant='contained' size='medium' onClick={this.submitProject.bind(this)}>
                                Thats all
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