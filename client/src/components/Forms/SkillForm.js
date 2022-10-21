import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import submit from '../../data/submit.png';

class SkillForm extends Component {

    constructor(props) {
        super(props);
        this.state= {
            submitted: false,
            selectedSkill: '',
            selectedPriority: 0,
            skillList: [],
            industryExperienceYears: 0,
            industryExperienceMonths: 0,
            otherExperienceYears: 0,
            otherExperienceMonths: 0,
            experienceType: 'industry',
            skillOptions: [],
        }
    }

    handleIndustryExperienceYearsChange(event) {
        this.setState({industryExperienceYears: event.target.value})
    }

    handleIndustryExperienceMonthsChange(event) {
        this.setState({industryExperienceMonths: event.target.value})
    }

    handleOtherExperienceYearsChange(event) {
        this.setState({otherExperienceYears: event.target.value})
    }

    handleOtherExperienceMonthsChange(event) {
        this.setState({otherExperienceMonths: event.target.value})
    }

    handleSelectedOption(event) {
        this.setState({selectedSkill: event.target.value.toUpperCase()});
    }

    handleSelectedPriority(event) {
        this.setState({selectedPriority: event.target.value});
    }

    handleSubmit() {
        this.props.sendSkillList({
            value: {
                skillList: this.state.skillList
            }
        })
        .then(res => {
            this.props.fetchSkillSet();
        })
        this.setState({
            submitted: true
        })
    }


    handleRemove(name) {
        let obj = this.state.skillList;
        obj.map((skill,index) => {
            if(skill.name === name) {
                obj.splice(index,1);
                return;
            }
        });
        this.setState({
            skillList: obj
        })
    }

    renderHeaderContent() {
        return <tr className='headerContent'>
            <th>
                Skill Name
            </th>
            <th>
                Industry Experience
            </th>
            <th>
                Personal Experience
            </th>
        </tr>
    }

    renderSkillList() {
        const skillList = this.state.skillList || [];
        if(skillList.length === 0) {
            return <div style={{'textAlign': 'center', margin: '1rem'}}>
                Please add skill 
            </div>
        }
        return skillList.map(skill => <tr className='skillOption'>
        <td className='skillWeight'>
            {skill.name}
        </td>
        <td className='skillMenu'>
            {skill.industryExperience.yr}yr {skill.industryExperience.mn}mn
        </td>
        <td className='skillAction'>
        {skill.otherExperience.yr}yr {skill.otherExperience.mn}mn
        </td>
    </tr>);
    }

    renderExperienceYears() {
        const years = new Array(50).fill(0);
        return years.map( (year,index) => <MenuItem value={index}>{index}</MenuItem>)
    }

    renderExperienceMonths() {
        const months = new Array(12).fill(0);
        return months.map( (month,index) => <MenuItem value={index}>{index}</MenuItem>)
    }

    addSkillHandle() {
        const skillName = this.state.selectedSkill;
        const industryExpObj = {
            yr: this.state.industryExperienceYears,
            mn: this.state.industryExperienceMonths
        }
        const otherExpObj = {
            yr: this.state.otherExperienceYears,
            mn: this.state.otherExperienceMonths
        }
        const temp = {
            name: skillName,
            industryExperience: industryExpObj,
            otherExperience: otherExpObj
        }

        const obj = this.state.skillList;
        obj.push(temp);
        this.setState({
            skillList: obj
        })

        this.setState({
            selectedSkill: '',
            industryExperienceYears: 0,
            industryExperienceMonths: 0,
            otherExperienceYears: 0,
            otherExperienceMonths: 0,
        })
    }

    render() {
        return( <div>
                {!this.state.submitted &&<div>
                    <h5  style={{textAlign: 'center', color: '#1272EB', fontFamily: 'sans-serif', marginBottom: '1rem'}}>Please add your skills</h5>
                    <div className='skillAddPane'>
                        <TextField id="outlined-basic" label="Skill" size='small' variant="outlined"
                            value={this.state.selectedSkill}
                            onChange={(event) => {
                            this.handleSelectedOption(event);
                        }} />
                        <div style={{marginLeft: '1rem'}}/>
                        <div className='inputBoxColumn'>                      
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Industy Experience :
                                </div>
                                <div className='candidateExperienceSelect'>
                                    <Select
                                        id="experienceYearsSelect"
                                        value={this.state.industryExperienceYears}
                                        fullWidth
                                        variant="outlined"
                                        onChange={this.handleIndustryExperienceYearsChange.bind(this)}
                                    >
                                        {this.renderExperienceYears()}
                                    </Select> 
                                    <div style={{'margin': '1rem'}}>Years</div>
                                    <Select
                                        id="experienceMonthsSelect"
                                        value={this.state.industryExperienceMonths}
                                        fullWidth
                                        variant="outlined"
                                        onChange={this.handleIndustryExperienceMonthsChange.bind(this)}
                                    >
                                        {this.renderExperienceMonths()}
                                    </Select>
                                    <div style={{'margin': '1rem'}}>Months</div>
                                </div>              
                            </div>
                        </div>
                        <div style={{marginLeft: '1rem'}}/>
                        <div className='inputBoxColumn'>                      
                            <div className="form_inputBox input-field">
                                <div className='formLabel_title'>
                                    Intern/Personal Experience :
                                </div>
                                <div className='candidateExperienceSelect'>
                                    <Select
                                        id="experienceYearsSelect"
                                        value={this.state.otherExperienceYears}
                                        fullWidth
                                        variant="outlined"
                                        onChange={this.handleOtherExperienceYearsChange.bind(this)}
                                    >
                                        {this.renderExperienceYears()}
                                    </Select> 
                                    <div style={{'margin': '1rem'}}>Years</div>
                                    <Select
                                        id="experienceMonthsSelect"
                                        value={this.state.otherExperienceMonths}
                                        fullWidth
                                        variant="outlined"
                                        onChange={this.handleOtherExperienceMonthsChange.bind(this)}
                                    >
                                        {this.renderExperienceMonths()}
                                    </Select>
                                    <div style={{'margin': '1rem'}}>Months</div>
                                </div>              
                            </div>
                        </div>
                        <div style={{marginLeft: '1rem'}}/>
                        <Button  variant="contained" onClick={this.addSkillHandle.bind(this)} size='small'>Add Skill</Button>
                    </div>
                    <table style={{'width': '30rem'}}>
                        {this.renderHeaderContent()}
                        {this.renderSkillList()}
                    </table>
                    <div style={{'display': 'flex', 'justifyContent': 'center', 'margin': '2rem'}}>
                        <Button size='large' variant='contained' onClick={this.handleSubmit.bind(this)}>
                            Save
                        </Button>
                    </div>
                </div>}
                {this.state.submitted && <img src={submit} alt="Avatar"/>}
                </div>
        )
    }
};

export default connect(null, actions)(SkillForm);