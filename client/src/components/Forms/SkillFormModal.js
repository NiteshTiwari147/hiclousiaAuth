import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import * as actions from '../../actions';
import './styles.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.9)',
    width: 'fit-content',
    height: '50rem',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid white',
    borderRadius: '15px',
    boxShadow: '2px 2px #1072EB',
    p: 4,
};

class SkillModal extends Component {
    constructor(props) {
        super(props);
        this.state= {
            selectedSkill: '',
            selectedPriority: 0,
            skillList: this.props.skillList ? this.props.skillList: [],
            industryExperienceYears: 0,
            industryExperienceMonths: 0,
            otherExperienceYears: 0,
            otherExperienceMonths: 0,
            experienceType: 'industry',
            skillOptions: [],
        }
    }

    handleSelectedOption(event) {
        this.setState({selectedSkill: event.target.value.toUpperCase()});
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

    addSkillHandle() {
        const skillName = this.state.selectedSkill;
        const industryExpObj = {
            yr: this.state.industryExperienceYears,
            mon: this.state.industryExperienceMonths
        }
        const otherExpObj = {
            yr: this.state.otherExperienceYears,
            mon: this.state.otherExperienceMonths
        }
        const temp = {
            skillName: skillName,
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

    handleSubmit() {
        this.props.sendSkillList({
            value: {
                skillList: this.state.skillList
            }
        })
        .then(res => {
            this.props.fetchSkillSet();
            this.props.close();
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
        console.log(" here is the ;isdt", this.props)
        const skillList = this.state.skillList || [];
        if(skillList.length === 0) {
            return <div style={{'textAlign': 'center', margin: '1rem'}}>
                Please add skill 
            </div>
        }
        return skillList.map(skill => <tr className='skillOption'>
        <td className='skillWeight'>
            {skill.skillName.toUpperCase()}
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
                    <div className='form_title'>
                        <h5>Add Skill data</h5>
                        <div className='skillAddPane'>
                            <TextField id="outlined-basic" label="Please enter skill name here" size='small' variant="outlined"
                                value={this.state.selectedSkill}
                                fullWidth
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
                    </div>
                </div>
                <div style={{'display': 'flex', 'justifyContent': 'center', 'margin': '2rem'}}>
                    <Button size='large' variant='contained' onClick={this.handleSubmit.bind(this)}>
                        Save
                    </Button>
                </div>
            </Box>
        </Modal>
        </div>
    }
};

export default connect(null, actions)(SkillModal);
  