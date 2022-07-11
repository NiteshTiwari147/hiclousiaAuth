import React, { Component } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import './styles.css';

const industryOptions = [
    {
        title: 'Select',
        value: 'select'
    },
    {
        title: 'IT',
        value: 'it'
    }
];

const departmentOptions = [
    {
        title: 'Select',
        value: 'select'
    },
    {
        title: 'Front End',
        value: 'frontEnd'
    },
    {
        title: 'Back End',
        value: 'backEnd'
    },
    {
        title: 'Full Stack',
        value: 'fullStack'
    },
    {
        title: 'Data Engineering',
        value: 'dataEngineering'
    },
    {
        title: 'Data Science',
        value: 'dataScience'
    },
];


class FilterPane extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state ={ industry: this.props ? this.props.industry: 'select', department: this.props ? this.props.department: 'select', experienceYears: this.props ? this.props.experienceYears : 0, experienceMonths: this.props ? this.props.experienceMonths : 0,
            city: 'All'
    }
    }

    handleExperienceYearsChange(event) {
        this.setState({experienceYears: event.target.value})
    }

    handleExperienceMonthsChange(event) {
        this.setState({experienceMonths: event.target.value})
    }

    handeIndustryChange(event) {
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

    renderFilterOptions(options, changeHandle, valueSelected) {
        return <Select
            id="industryTypeSelect"
            value={valueSelected}
            fullWidth
            variant="outlined"
            onChange={changeHandle}
            >
                {options.map(option => <MenuItem value={option.value} className='optionLabel'>{option.title}</MenuItem>)}
        </Select>
    }
    render() {
        return (
            <div className='filterContainer shadow'>
                <div className='filter'> 
                    <label className='filterTitle'>Experience</label>
                    {this.renderFilterOptions(industryOptions, this.handeIndustryChange.bind(this), this.state.industry)}
                </div>
                <div className='filter'>
                <label className='filterTitle'>Department</label>
                    {this.renderFilterOptions(departmentOptions, this.handleDepartmentChange.bind(this), this.state.department)}
                </div>
                <div className='filter'>
                    <label className='filterTitle'>Experience</label>
                    <div className='jobExperienceSelect'>
                        <Select
                            id="experienceYearsSelect"
                            value={this.state.experienceYears}
                            fullWidth
                            variant="outlined"
                            onChange={this.handleExperienceYearsChange.bind(this)}
                        >
                            {this.renderExperienceYears()}
                        </Select> 
                    <div style={{'margin': '1rem', 'fontSize': 'small'}}>Years</div>
                        <Select
                            id="experienceMonthsSelect"
                            value={this.state.experienceMonths}
                            fullWidth
                            variant="outlined"
                            onChange={this.handleExperienceMonthsChange.bind(this)}
                        >
                            {this.renderExperienceMonths()}
                        </Select>
                        <div style={{'margin-top': '1rem','margin-left': '1rem', 'fontSize': 'smaller'}}>Months</div>
                    </div>
                </div>
                <div style={{'margin': '1rem'}} />
                <div className='fitler'>
                    <label className='filterTitle'>Location</label>
                    <input 
                        placeholder={this.state.city}
                        value={this.state.city}
                        onChange={ e => this.setState({ city: e.target.value })}
                    />
                </div>
                <Button className='searchBox' variant="contained">
                    < SearchIcon fontSize="large" />
                </Button>
            </div>
        )
    }
}

export default FilterPane;