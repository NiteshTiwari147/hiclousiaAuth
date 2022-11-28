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

class ProjectModal extends Component {
    constructor(props) {
      super(props);
      this.state = { fromExp: false,tittle: '', desc: '', startDate: dayjs(Date.now()).format('YYYY-MM-DD'),duration: { year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0 },
        endDate: dayjs(Date.now()).format('YYYY-MM-DD'),industry: '',
        department: '', jobRoles: [],  typeOfProject: 'industry', skillUsed: [], isError: false,
        skills:  this.props.skillData || []} 
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
                typeOfProject: this.state.typeOfProject,
                duration: this.state.duration,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                selectedSkill: this.state.skillUsed
            }
        }
        if(this.isValid(obj)) {
            this.props.sendProjectInfo(obj)
            .then( () => {
                this.props.sendSkillList({
                    value: {
                        skillList: this.state.skillUsed,
                        typeOfProject: this.state.typeOfProject,
                        duration: this.state.duration,
                    }
                });
            })
            .then(res => {
                this.props.fetchSkillSet();
                this.setState({ tittle: '', desc: '', startDate: '',duration: {}, endDate: '',
                industry: 'industry', department: 'department', jobRoles: [],  typeOfProject: 'industry', skillUsed: []})
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