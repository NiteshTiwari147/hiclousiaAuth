import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import submit from '../../data/submit.png';

import ExpectationForm from './expectationForm';

class CandidateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {submitted: true,
        name: this.props.name ? this.props.name: 'User',
        city: '',
        age: this.props.age ? this.props.age: '25',
        gender: this.props.gender ? this.props.gender: 'male',
        expectedIndustry: this.props.industry ? this.props.industry: 'industry',
        expectedDepartment: this.props.department ? this.props.department: 'industry',
        role: this.props.role ? this.props.role: 'candidate',
        position: this.props.position ? this.props.position: 'L1',
        budget: this.props.budget ? this.props.budget: 'B1',
        experienceYears: 0, experienceMonths: 0, currentEmployment: 'student', companyName: '', designation: 'L1',
        currentIndustry: 'industry', currentDepartment: 'department'
        }
    }

    componentDidMount() {
        this.addCandidateInfo();
    }

    
    addCandidateInfo() {
        this.props.sendBasicInfo({          
            value: {
                name: this.state.name,
                age: this.state.age,
                city: this.state.city,
                gender: this.state.gender,
                role: this.state.role,
                expectedPosition: this.state.position,
                expectedSalary: this.state.budget,
                expectedIndustry: this.state.expectedIndustry,
                expectedDepartment: this.state.expectedDepartment,
            }      
        })
        .then(res => {
            this.props.fetchCandidate();
        })
        this.setState({submitted: true})
    }

    handleEmploymentChange(event) {
        this.setState({currentEmployment: event.target.value})
    }

    handleExperienceYearsChange(event) {
        this.setState({experienceYears: event.target.value})
    }

    handleExperienceMonthsChange(event) {
        this.setState({experienceMonths: event.target.value})
    }

    handleIndustryChange(event) {
        this.setState({currentIndustry: event.target.value})
    }

    handleDepartmentChange(event) {
        this.setState({currentDepartment: event.target.value})
    }

    handleDesignationChange(event) {
        this.setState({designation: event.target.value})
    }

    renderExperienceYears() {
        const years = new Array(50).fill(0);
        return years.map( (year,index) => <MenuItem value={index}>{index}</MenuItem>)
    }

    renderExperienceMonths() {
        const months = new Array(12).fill(0);
        return months.map( (month,index) => <MenuItem value={index}>{index}</MenuItem>)
    }

    renderCurrentEmployedFields() {
        if(this.state.currentEmployment === 'employed') {
            return <div>
                <div className='form_inputBox input-field'>
                    <div className='formLabel_title'>
                            Company :
                    </div>
                    <div className='formInput'>
                                <input 
                                    placeholder="Enter Your Company Name"
                                    value={this.state.companyName}
                                    onChange={ e => this.setState({ companyName: e.target.value })}
                                />    
                    </div>
                    <div className='formLabel_title'>
                            Designation :
                    </div>
                    {this.renderPosition()}
                </div>
                <div className='inputBoxColumn' style={{'flex-direction': 'column', 'marginLeft': '1rem'}}>
                    <h7>Select Industry and Department you're working into </h7>
                    <div className='industryAndDepartmentSelect'>
                        <Select
                            id="industrySelect"
                            value={this.state.currentIndustry}
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
                            value={this.state.currentDepartment}
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
            </div>
        }
    }

    renderSkillPageTitle() {
        return <div>
            <h3>Add your skills here</h3>
        </div>

    }

    renderPosition() {
        if(this.state.currentEmployment === 'employed') {
            return <Select
                    id="experienceYearsSelect"
                    value={this.state.designation}
                    fullWidth
                    variant="outlined"
                    onChange={this.handleDesignationChange.bind(this)}
                >
                    <MenuItem value={'L1'}>Level 1</MenuItem>
                    <MenuItem value={'L2'}>Level 2</MenuItem>
                    <MenuItem value={'L3'}>Level 3</MenuItem>
                    <MenuItem value={'L4'}>Level 4</MenuItem>
                    <MenuItem value={'L5'}>Level 5</MenuItem>
                </Select>
        }
    }


    render() {
        return (
            <div className='form_container'>
            <div className="formContent">
                {!this.state.submitted && <form className="col s16">
                    <div className='inputBoxColumn' style={{marginLeft: '1rem'}}>
                        <div className='formLabel_title' style={{'marginBottom': '1rem'}}>
                            Current Employment Status :
                        </div>
                        <Select
                                id="experienceYearsSelect"
                                value={this.state.currentEmployment}
                                size='medium'
                                variant="outlined"
                                onChange={this.handleEmploymentChange.bind(this)}
                            >
                            <MenuItem value={'student'}>Student</MenuItem>
                            <MenuItem value={'employed'}>Employed</MenuItem>
                            <MenuItem value={'Not Employed'}>Not Employed</MenuItem>
                        </Select>
                    </div>
                    <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Prefered Location :
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter your city"
                                    value={this.state.city}
                                    onChange={ e => this.setState({ city: e.target.value })}
                                />  
                            </div>                    
                        </div>
                    <div className='inputBoxColumn'>                      
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Experience :
                            </div>
                            <div className='candidateExperienceSelect'>
                                <Select
                                    id="experienceYearsSelect"
                                    value={this.state.experienceYears}
                                    fullWidth
                                    variant="outlined"
                                    onChange={this.handleExperienceYearsChange.bind(this)}
                                >
                                    {this.renderExperienceYears()}
                                </Select> 
                                <div style={{'margin': '1rem'}}>Years</div>
                                <Select
                                    id="experienceMonthsSelect"
                                    value={this.state.experienceMonths}
                                    fullWidth
                                    variant="outlined"
                                    onChange={this.handleExperienceMonthsChange.bind(this)}
                                >
                                    {this.renderExperienceMonths()}
                                </Select>
                                <div style={{'margin': '1rem'}}>Months</div>
                            </div>              
                        </div>
                    </div>
                    {this.renderCurrentEmployedFields()}
                    <div className='btnOption'>
                        <button className="btn" onClick={this.addCandidateInfo.bind(this)}><div className='linkBtn'>
                            Save
                        </div></button>
                    </div>
                </form>}
                {this.state.submitted && <img src={submit} alt="Avatar"/>}
            </div>
            
        </div>
        )
    }
};

export default connect(null, actions)(CandidateForm);