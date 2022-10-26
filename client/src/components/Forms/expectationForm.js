import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import CandidateForm from './CandidateForm';

import submit from '../../data/submit.png';
import './styles.css';

const style = {
    width: '13rem',
    marginBottom: '2rem'
}

class ExpectationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            age: this.props.age,
            gender: this.props.gender,
            role: 'candidate',
            city: '',
            submitted: false,
            purpose: 'job',
            budget: 'B1',
            position: 'L1',
            department: 'department',
            industry: 'industry'
        }
    }

    handleSubmit() {
        this.props.sendSkillList({
            value: {
                skillList: []
            }
        })
        this.props.sendBasicInfo({          
            value: {
                name: this.state.name,
                age: this.state.age,
                city: this.state.city,
                gender: this.state.gender,
                role: this.state.role,
                purpose: this.state.purpose,
                expectedPosition: this.state.position,
                expectedSalary: this.state.budget,
                expectedIndustry: this.state.expectedIndustry,
                expectedDepartment: this.state.expectedDepartment,
            }      
        })
        .then(res => {
            this.props.fetchCandidate();
        })
        this.setState({
            submitted: true
        })
    }

    handleIndustryChange(event) {
        this.setState({industry: event.target.value})
    }

    handleDepartmentChange(event) {
        this.setState({department: event.target.value})
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
        this.setState({
            city: event.target.value
        })
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
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter your preffered city"
                                    value={this.state.city}
                                    onChange={this.handleCityChange.bind(this)}
                                />  
                            </div>                    
                    </div>
                        <div className='inputBoxColumn' style={{'flex-direction': 'column', 'align-items': 'flex-start'}}>
                            <h6>Select desired industry and role</h6>
                            <div className='industryAndDepartmentSelect' style={{marginLeft: '0rem'}}>
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
                                        <MenuItem value={'frontEnd'}>Front End</MenuItem>
                                        <MenuItem value={'backEnd'}>Back End</MenuItem>
                                        <MenuItem value={'fullStack'}>Full Stack</MenuItem>
                                        <MenuItem value={'dataEngineering'}>Data Engineering</MenuItem>
                                        <MenuItem value={'dataScience'}>Data Science</MenuItem>
                                    </Select>
                            </div>
                        </div>
                        {this.state.purpose !='upgrade' && <div className='inputBoxColumn' style={{marginTop: '1rem'}}>
                            <div className='formLabel_title' style={{'marginBottom': '1rem'}}>
                                Designation :
                            </div>
                            {this.renderPosition()}
                        </div>}
                        {this.state.purpose !='upgrade' && <div className='inputBoxColumn' style={{marginTop: '1rem'}}>
                            <div className='formLabel_title' style={{'marginBottom': '1rem'}}>
                                Budget :
                            </div>
                            {this.renderSalary()}
                        </div>}
                        <div style={{'display': 'flex', 'justifyContent': 'center', 'margin': '2rem'}}>
                            <Button size='large' variant='contained' onClick={this.handleSubmit.bind(this)}>
                                Save
                            </Button>
                        </div>
                    </form>
                </div>}
            </div>
        )
    }
}

export default connect(null, actions)(ExpectationForm);