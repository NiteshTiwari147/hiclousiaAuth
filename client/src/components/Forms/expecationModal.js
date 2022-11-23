import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


import './styles.css';
import { cities } from "../../constants/city";
import * as actions from '../../actions';
import { jobCategory } from '../../constants/jobCategoryAndPositions';

const style = {
    width: '13rem',
    marginBottom: '2rem'
}

const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid white',
    borderRadius: '15px',
    boxShadow: '2px 2px #1072EB',
    p: 4,
};

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

class ExpectationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data && this.props.data.name ? this.props.data.name :  '',
            age: this.props.data && this.props.data.age ? this.props.data.age :  '',
            gender: this.props.data && this.props.data.gender ? this.props.data.gender :  '',
            role: 'candidate',
            jobRoles: [],
            selectedDepartment: [],
            submitted: false,
            purpose: this.props.data && this.props.data.purpose ? this.props.data.purpose : 'job',
            cityName: this.props.data && this.props.data.city ? this.props.data.city : [],
            minBudget: this.props.data && this.props.data.expectedSalary ? this.props.data.expectedSalary.min: '',
            maxBudget: this.props.data && this.props.data.expectedSalary ? this.props.data.expectedSalary.max: '',
            isError: false,
            industry: this.props.data && this.props.data.expectedIndustry ? this.props.data.expectedIndustry : ''
        }
    }

    isValid() {
        const value = this.state;
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if(key === 'minBudget' || key === 'maxBudget') {
                    if(isNaN(Number(value[key]))) {
                        return false;
                    }
                }
                if(typeof value[key] === 'string' && (value[key]==='' || value[key] == undefined || value[key] == null)) {
                    return false;
                } else if(typeof value[key] === 'object' && value[key].length === 0) {
                    return false;
                }
            }
        }
        return true;
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
        if(this.isValid()) {
            this.props.updateExpectation({
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
                window.location.reload();
            });
        } else {
            this.setState({isError: true});
        }
    }

    handleIndustryChange(event) {
        this.setState({industry: jobCategory[event].title,
            jobRoles: jobCategory[event].roles})
        this.setState({isError: false});
    }

    handleDepartmentChange(event) {
        let newPositions = this.state.selectedDepartment;
        newPositions.push(this.state.jobRoles[event])
        this.setState({selectedDepartment: newPositions})
        this.setState({isError: false});
    }

    handleSalaryChange(event) {
        this.setState({budget: event.target.value})
        this.setState({isError: false});
    }

    handlePositionChange(event) {
        this.setState({position: event.target.value})
        this.setState({isError: false});
    }

    handlePurposeChange(event) {
        this.setState({purpose: event.target.value})
        this.setState({isError: false});
    }

    handleCityChange(event) {
        const {
            target: { value },
          } = event;
        const res = typeof value === 'string' ? value.split(',') : value
        this.setState({cityName: res});
        this.setState({isError: false});
    }

    handleMinBudgetChange(event) {
        this.setState({minBudget: event.target.value})
        this.setState({isError: false});
    }

    handleMaxBudgetChange(event) {
        this.setState({maxBudget: event.target.value})
        this.setState({isError: false});
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

    render() {
        return <div>
            <Modal
            open={this.props.open}
            onClose={this.props.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={styleBox}>
                    <div className='form_container'>
                        <div className='form_title'>
                            <h5>Expecations</h5>
                        </div>
                        {this.state.isError && <div className='form_title'>
                            <p style={{color: 'red'}}>Please fill correct information</p>
                        </div>}
                        <form className="col s16 formContent">
                            <div className='inputBoxColumn' style={{width: '100%'}}>
                                <div className="form_inputBox input-field" >
                                    <div className='formLabel_title' style={{'marginBottom': '1rem'}}>
                                        <h6>What are you looking for ?</h6>
                                    </div>
                                    {this.renderRoles()}
                                </div>
                                <div className="form_inputBox input-field">
                                    <div className='formLabel_title' style={{'marginBottom': '1rem'}}>
                                        <h6>Please prefred location</h6>
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
                                        sx={style}
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
                            <div className='inputBoxColumn' style={{'flex-direction': 'column', 'align-items': 'flex-start', width: '95%'}}>
                                <h6>Select desired industry and role</h6>
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
                            {this.state.purpose !='upgrade' && <div className='inputBoxColumn' style={{'flex-direction': 'column', 'align-items': 'flex-start', width: '95%'}}>
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
                    </div>
                </Box>
            </Modal>
        </div>
    }
}

export default withRouter(connect(null, actions)(ExpectationModal));