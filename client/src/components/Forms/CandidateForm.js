import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import SkillForm from './SkillForm';

class CandidateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {infoPage: true, skillPage: false  ,name: '', city: '', age: '', gender: '', industry: 'industry', department: 'department',
        experienceYears: 0, experienceMonths: 0, currentEmployment: 'student', companyName: '', designation: ''
        }
    }

    
    addCandidateInfo() {
        this.setState({infoPage: false})
        this.setState({skillPage: true})
        this.props.sendBasicInfo({          
            value: {
                name: this.state.name,
                age: this.state.age,
                city: this.state.city,
                industry: this.state.industry,
                department: this.state.department,
                experienceYears: this.state.experienceYears,
                experienceMonths: this.state.experienceMonths,
                currentEmployment: this.state.currentEmployment,
                companyName: this.state.companyName,
                designation: this.state.designation
            }      
        });
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

    handleGenderChange(event) {
        this.setState({gender: event.target.value})
    }

    handleIndustryChange(event) {
        this.setState({industry: event.target.value})
    }

    handleDepartmentChange(event) {
        this.setState({department: event.target.value})
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
            return <div className='form_inputBox input-field'>
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
                <div className='formInput'>
                            <input 
                                placeholder="Enter Your Designation"
                                value={this.state.designation}
                                onChange={ e => this.setState({ designation: e.target.value })}
                            />    
                </div>  
            </div>
        }
    }

    renderSkillPageTitle() {
        return <div>
            <h3>Add your skills here</h3>
            <p>Note: add them in ascending order for better assesment</p>
        </div>

    }


    render() {
        return (
            <div className='form_container'>
            <div className='form_title'>
                { this.state.infoPage && <h3>Fill Basic Information</h3>}
                { this.state.skillPage && this.renderSkillPageTitle()}
            </div>
            <div className="row formContent">
                {this.state.infoPage && <form className="col s16">
                    <div className='inputBoxColumn'>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Name :
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter Your Name"
                                    value={this.state.name}
                                    onChange={ e => this.setState({ name: e.target.value })}
                                />    
                            </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Age :
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter your age"
                                    value={this.state.age}
                                    onChange={ e => this.setState({ age: e.target.value })}
                                />  
                            </div>                    
                        </div>
                    </div>
                    <div className='inputBoxColumn'>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Gender :
                            </div>
                            <div className='formInput' style={{'marginTop': '1rem'}}>
                                <Select
                                    id="genderSelect"
                                    value={this.state.gender}
                                    fullWidth
                                    variant="outlined"
                                    onChange={this.handleGenderChange.bind(this)}
                                >
                                    <MenuItem value={'male'}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                    <MenuItem value={'other'}>Other</MenuItem>
                                </Select>
                            </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                        <div className='formLabel_title' style={{'marginBottom': '1rem'}}>
                            Current Employment Status :
                        </div>
                        <Select
                                id="experienceYearsSelect"
                                value={this.state.currentEmployment}
                                fullWidth
                                variant="outlined"
                                onChange={this.handleEmploymentChange.bind(this)}
                            >
                               <MenuItem value={'student'}>Student</MenuItem>
                               <MenuItem value={'employed'}>Employed</MenuItem>
                               <MenuItem value={'Not Employed'}>Not Employed</MenuItem>
                        </Select>
                    </div>
                    </div>
                    <div className='inputBoxColumn'>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                City :
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter your city"
                                    value={this.state.city}
                                    onChange={ e => this.setState({ city: e.target.value })}
                                />  
                            </div>                    
                        </div>
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
                    <div className='inputBoxColumn' style={{'flex-direction': 'column'}}>
                        <h7>Select Industry and Department you're looking for </h7>
                        <div className='industryAndDepartmentSelect'>
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
                    {this.renderCurrentEmployedFields()}
                    <div className='btnOption'>
                        <button className="btn" onClick={this.addCandidateInfo.bind(this)}><div href='/surveys' className='linkBtn'>
                            Save
                        </div></button>
                    </div>
                </form>}
                {this.state.skillPage && <SkillForm />}
            </div>
            
        </div>
        )
    }
};

export default connect(null, actions)(CandidateForm);