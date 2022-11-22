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
            value={valueSelected ? valueSelected: 'select' }
            fullWidth
            variant="outlined"
            onChange={changeHandle}
            >
                {options.map(option => <MenuItem value={option.value} className='optionLabel'>{option.title}</MenuItem>)}
        </Select>
    }
    render() {
        const { industry , department, expectedSalary, cities } = this.props;
        return (
            <div className='filterContainer shadow'>
                <div className='filter'> 
                    <label className='filterTitle'>Experience</label>
                    {industry}
                </div>
                <div className='filter'>
                    <label className='filterTitle'>Department</label>
                    {department && department.map(d => <div>{d}</div>)}
                </div>
                <div className='filter'>
                    <label className='filterTitle'>Expected Salary</label>
                    <div>
                        {expectedSalary.min} - {expectedSalary.max} LPA
                    </div>
                </div>
                <div style={{'margin': '1rem'}} />
                <div className='fitler'>
                    <label className='filterTitle'>Preferred Locations</label>
                    {cities && cities.map(c => <div>{c}</div>)}
                </div>
                <Button className='searchBox' variant="contained">
                    Edit
                </Button>
            </div>
        )
    }
}

export default FilterPane;