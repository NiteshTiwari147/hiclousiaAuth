import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


import './styles.css';
import { cities } from "../../constants/city";
import * as actions from '../../actions';
import { jobCategory } from '../../constants/jobCategoryAndPositions'
import LoadingScreen from '../utils/loadingScreen';

const style = {
    width: '13rem',
    marginBottom: '2rem'
}

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

const dep = new Set();

class ExpectationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            age: this.props.age,
            gender: this.props.gender,
            role: 'candidate',
            jobRoles: [],
            selectedDepartment: [],
            submitted: false,
            purpose: 'job',
            cityName: [],
            minBudget: '0',
            maxBudget: '0',
            department: 'department',
            industry: 'industry'
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

    handleSubmit() {
        this.props.sendBasicInfo({          
            value: {
                name: this.state.name,
                age: this.state.age,
                city: this.state.cityName,
                gender: this.state.gender,
                role: this.state.role,
                purpose: this.state.purpose,
                expectedSalary: {
                    min: this.state.minBudget,
                    max: this.state.maxBudget
                },
                expectedIndustry: this.state.industry,
                expectedDepartment: Array.from(dep)
            }      
        })
        .then(res => {
            this.props.fetchCandidate();
            this.props.history.push("/talent/dashboard");
        })
        this.setState({
            submitted: true
        });
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

    handleSalaryChange(event) {
        this.setState({budget: event.target.value})
    }

    handlePositionChange(event) {
        this.setState({position: event.target.value})
    }

    handlePurposeChange(event) {
        this.setState({purpose: event.target.value})
    }

    handleCityChange(event) {
        const {
            target: { value },
          } = event;
          const res = typeof value === 'string' ? value.split(',') : value
          this.setState({cityName: res});
    }

    handleMinBudgetChange(event) {
        this.setState({minBudget: event.target.value})
    }

    handleMaxBudgetChange(event) {
        this.setState({maxBudget: event.target.value})
    }

    renderSalary() {
        return <Select
        id="experienceYearsSelect"
        value={this.state.budget}
        sx={style}
        variant="outlined"
        onChange={this.handleSalaryChange.bind(this)}
        >
            <MenuItem value={'B1'}>upto 5 lacs</MenuItem>
            <MenuItem value={'B2'}>5-7.5 lacs</MenuItem>
            <MenuItem value={'B3'}>7.5-10lacs</MenuItem>
            <MenuItem value={'B4'}>10-15 lac</MenuItem>
            <MenuItem value={'B5'}>15+</MenuItem>
    </Select>
    }

    renderPosition() {
        return <Select
                id="experienceYearsSelect"
                value={this.state.position}
                sx={style}
                variant="outlined"
                onChange={this.handlePositionChange.bind(this)}
            >
                <MenuItem value={'L1'}>Level 1</MenuItem>
                <MenuItem value={'L2'}>Level 2</MenuItem>
                <MenuItem value={'L3'}>Level 3</MenuItem>
                <MenuItem value={'L4'}>Level 4</MenuItem>
                <MenuItem value={'L5'}>Level 5</MenuItem>
            </Select>
    }

    renderRoles() {
        return <Select
                id="experienceYearsSelect"
                value={this.state.purpose}
                sx={style}
                variant="outlined"
                onChange={this.handlePurposeChange.bind(this)}
            >
                <MenuItem value={'job'}>Finding Job</MenuItem>
                <MenuItem value={'upgrade'}>Upskilling</MenuItem>
                <MenuItem value={'both'}>Both</MenuItem>
            </Select>
    }

    render () {
        return (
            <div>
                {!this.state.submitted && <div>   
                    <form className="col s16">
                        <div className='inputBoxColumn' style={{'flex-direction': 'column', 'align-items': 'flex-start'}}>
                            <div className='formLabel_title' style={{'marginBottom': '1rem'}}>
                                <h6>What are you looking for ?</h6>
                            </div>
                            {this.renderRoles()}
                        </div>
                        <div className="form_inputBox input-field" style={{margin: '0rem'}}>
                            <div className='formLabel_title'>
                                Please prefred location
                            </div>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={this.state.cityName}
                                onChange={this.handleCityChange.bind(this)}
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
                        <div className='inputBoxColumn' style={{'flex-direction': 'column', 'align-items': 'flex-start'}}>
                            <h6>Select desired industry and role</h6>
                            <div className='industryAndDepartmentSelect' style={{marginLeft: '0rem'}}>
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
                        {this.state.purpose !='upgrade' && <div className='inputBoxColumn' style={{marginTop: '1rem'}}>
                            <div className='formLabel_title' style={{'marginBottom': '1rem'}}>
                                Budget :
                            </div>
                            <div style={{display: 'flex', marginTop: '1rem'}}>
                                <TextField value={this.state.minBudget} label="Min" onChange={this.handleMinBudgetChange.bind(this)}/>
                                <p>LPA</p>
                                <div style={{marginLeft: '1rem'}} />
                                <TextField value={this.state.maxBudget} label="Max" onChange={this.handleMaxBudgetChange.bind(this)} />
                                <p>LPA</p>
                            </div>
                        </div>}
                        <div style={{'display': 'flex', 'justifyContent': 'center', 'margin': '2rem'}}>
                            <Button size='large' variant='contained' onClick={this.handleSubmit.bind(this)}>
                                Save
                            </Button>
                        </div>
                    </form>
                </div>}
                {this.state.submitted && <LoadingScreen />}
            </div>
        )
    }
}

export default withRouter(connect(null, actions)(ExpectationForm));