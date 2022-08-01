import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import submit from '../../data/submit.png';

class SkillForm extends Component {

    constructor(props) {
        super(props);
        this.state= {
            submitted: false,
            selectedSkill: '',
            selectedPriority: 0,
            skillList: [],
            skillOptions: [],
        }
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
                Priority
            </th>
            <th>
                Skill Name
            </th>
            <th>
                Action
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
            {skill.inverseWeight}
        </td>
        <td className='skillMenu'>
            {skill.name}
        </td>
        <td className='skillAction'>
            <Button variant="contained" size='small' sx={{width: 2}} onClick={this.handleRemove.bind(this, skill.name)}>
                Remove
            </Button>
        </td>
    </tr>);
    }

    addSkillHandle() {
        const skillName = this.state.selectedSkill;
        const skillPriority = parseInt(this.state.selectedPriority);
        const temp = {
            name: skillName,
            inverseWeight: skillPriority
        }

        const obj = this.state.skillList;
        obj.push(temp);
        this.setState({
            skillList: obj
        })

        this.setState({
            selectedSkill: '',
            selectedPriority: 0,
        })
    }

    render() {
        return( <div>
                {!this.state.submitted &&<div>
                    <h5  style={{textAlign: 'center', color: '#1272EB', fontFamily: 'cursive', marginBottom: '1rem'}}>Please add your skills</h5>
                    <p style={{color: 'green'}}>Note: add them in ascending order for better assesment</p>
                    <div className='skillAddPane'>
                        <TextField id="outlined-basic" label="Skill" size='small' variant="outlined"
                            value={this.state.selectedSkill}
                            onChange={(event) => {
                            this.handleSelectedOption(event);
                        }} />
                        <div style={{marginLeft: '1rem'}}/>
                        <TextField id="outlined-number"
                            value={this.state.selectedPriority}
                            label="Priority"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => {
                            this.handleSelectedPriority(event);
                        }} />
                        <div style={{marginLeft: '1rem'}}/>
                        <Button  variant="contained" onClick={this.addSkillHandle.bind(this)} size='medium'>Add Skill</Button>
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