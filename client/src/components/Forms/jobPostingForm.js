import React, { Component } from "react";
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import * as actions from '../../actions';
import { jobCategory } from '../../constants/jobCategoryAndPositions';
import { cities } from "../../constants/city";
import { skills } from '../../constants/skills'

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

const res = new Set();
const dep = new Set();

class JobPostingForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organization: '',
            designation: '',
            desc: '',
            industry: '',
            selectedDepartment: [],
            jobRoles: [],
            minBudget: '4',
            maxBudget: '10',
            cityName: [],
            minExp: '1',
            maxExp: '2',
            selectedSkill: []
        }
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

    handleChange = (event) => {
        const {
          target: { value },
        } = event;
        const res = typeof value === 'string' ? value.split(',') : value
        this.setState({cityName: res});
    };

    handleMinExpChange(event) {
        this.setState({minExp: event.target.value})
    }

    handleMaxExpChange(event) {
        this.setState({maxExp: event.target.value})
    }

    handleMinBudgetChange(event) {
        this.setState({minBudget: event.target.value})
    }

    handleMaxBudgetChange(event) {
        this.setState({maxBudget: event.target.value})
    }

    handleIndustryChange(event) {
        this.setState({industry: jobCategory[event].title,
            jobRoles: jobCategory[event].roles})
    }

    handleDepartmentChange(event) {
        let newPositions = this.state.selectedDepartment;
        newPositions.push(this.state.jobRoles[event])
        this.setState({selectedDepartment: newPositions})
    }

    handlePostJob() {
        this.props.sendJobPostInfo({
            value: {
                company: this.state.organization,
                minExp: this.state.minExp,
                maxExp: this.state.maxExp,
                desc: this.state.desc,
                industry: this.state.industry,
                department: Array.from(dep),
                skills: Array.from(res),
                cities: this.state.cityName,
                minBudget: this.state.minBudget,
                maxBudget: this.state.maxBudget
            }
        })
        .then(res => {
            this.props.fetchJobs();
        })
        .then(res => { 
            this.setState({
                organization: '',
                designation: '',
                desc: '',
                industry: '',
                selectedDepartment: [],
                jobRoles: [],
                minBudget: '4',
                maxBudget: '10',
                cityName: [],
                minExp: '1',
                maxExp: '2',
                selectedSkill: []
            })
            this.props.close();
        })
    }

    render() {
        return <div>
            <Modal
              open={this.props.open}
              onClose={this.props.close}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className='form_container'>
                    <form className="col s16 formContent">
                        <div className='inputBoxColumn' style={{width: '80%'}}>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Company :
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
                                    Experience :
                                </div>
                                <div className='formInput'>
                                    <div style={{display: 'flex', marginTop: '1rem'}}>
                                        <TextField value={this.state.minExp} label="Min" onChange={this.handleMinExpChange.bind(this)}/>
                                        <p>yrs</p>
                                        <div style={{marginLeft: '1rem'}} />
                                        <TextField value={this.state.maxExp} label="Max" onChange={this.handleMaxExpChange.bind(this)} />
                                        <p>yrs</p>
                                    </div>    
                                </div>                    
                            </div>
                        </div>
                        <div className='inputBoxColumn' style={{width: '80%'}}>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Budget
                                </div>
                                <div style={{display: 'flex', marginTop: '1rem'}}>
                                    <TextField value={this.state.minBudget} label="Min" onChange={this.handleMinBudgetChange.bind(this)}/>
                                    <p>LPA</p>
                                    <div style={{marginLeft: '1rem'}} />
                                    <TextField value={this.state.maxBudget} label="Max" onChange={this.handleMaxBudgetChange.bind(this)} />
                                    <p>LPA</p>
                                </div>                    
                            </div>
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    City :
                                </div>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={this.state.cityName}
                                    onChange={this.handleChange.bind(this)}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    >
                                    {cities.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        <Checkbox checked={this.state.cityName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                    </Select>        
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
                                    multiple
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
                        <div className="form_inputBox input-field" style={{width: '75%'}}>
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
                        <div className='inputBoxColumn' style={{width: '80%'}}>
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
                        <Button color="primary" variant="contained" onClick={this.handlePostJob.bind(this)}>Post Job</Button>
                    </form>
                </div>
              </Box>
            </Modal>
        </div>
    }
}

export default connect(null, actions)(JobPostingForm);