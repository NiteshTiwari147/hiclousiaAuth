import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

const data = [
    {label: 'Select ', id: 0, priority: -1},
    {label: 'React ', id: 1, priority: -1},
    {label: 'Angular ', id: 2, priority: -1},
    {label: 'Java ', id: 3, priority: -1},
    {label: 'Python ', id: 4, priority: -1},
]
class SkillForm extends Component {

    constructor(props) {
        super(props);
        this.state= { 
            selectedSkill: {label: 'Select ', id: 0, priority: -1}, 
            skillList: [],
            skillOptions: [],
        }
    }

    renderSelectedOption(skillObj) {
        const seriesIndex = [1,2,3,5,8,13]
        const seriesWeight = [1,3,6,11,19,32];
        this.setState({selectedSkill: skillObj});
    }

    handleRemove(index) {
        const obj = this.state.skillList;
        obj.splice(index-1,1);
        obj.map( (item,index) => {
            item.priority = index+1;
        })
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
                Priority
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
            {skill.priority}
        </td>
        <td className='skillMenu'>
            {skill.label}
        </td>
        <td className='skillAction'>
            <Button variant="contained" size='small' sx={{width: 2}} onClick={this.handleRemove.bind(this, skill.priority)}>
                Remove
            </Button>
        </td>
    </tr>);
    }

    addSkillHandle() {
        const skillObj = this.state.selectedSkill;
        const obj = this.state.skillList;
        const len = obj.length;
        skillObj.priority = len+1;
        
        obj.push(this.state.selectedSkill);
        this.setState({
            skillList: obj
        })
        this.setState({
            selectedSkill: {label: 'Select ', id: 0, priority: -1},
        })
    }

    render() {
        return(
                <div>
                    <div className='skillAddPane'>
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={this.state.selectedSkill}
                        onChange={(event, newValue) => {
                            this.renderSelectedOption(newValue);
                        }}
                        size='small'
                        options={data}
                        sx={{ width: 200, background: 'white'}}
                        renderInput={(params) => { 
                            return <TextField {...params} label="Skill" size='small' />}}
                        />
                        <Button  variant="contained" onClick={this.addSkillHandle.bind(this)} size='medium'>Add Skill</Button>
                    </div>
                    <table style={{'width': '30rem'}}>
                        {this.renderHeaderContent()}
                        {this.renderSkillList()}
                    </table>
                    <div style={{'display': 'flex', 'justifyContent': 'center', 'margin': '2rem'}}>
                        <Button size='large' variant='contained'>
                            Save
                        </Button>
                    </div>
                </div>
        )
    }
};

export default SkillForm;