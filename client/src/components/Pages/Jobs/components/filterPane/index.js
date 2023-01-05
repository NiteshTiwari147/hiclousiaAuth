import React, { Component } from 'react';
import Button from '@mui/material/Button';

import ExpecationModal from '../../../../Forms/expecationModal';
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
        this.state ={
            editModalOpen: false,
        }
    }

    handleEditModalOpen() {
        this.setState({editModalOpen: true})
    }

    handleEditModalClose() {
        this.setState({editModalOpen: false})
    }
    render() {
        const { expectedIndustry, expectedDepartment, expectedCities, expectedSalary} = this.props.data;
        return (
            <div className='filterContainer shadow'>
                <div className='filter'> 
                    <label className='filterTitle'>Experience</label>
                    {expectedIndustry}
                </div>
                <div className='filter'>
                    <label className='filterTitle'>Department</label>
                    {expectedDepartment && expectedDepartment.map(d => <div>{d}</div>)}
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
                    {expectedCities && expectedCities.map(c => <div>{c}</div>)}
                </div>
                {/* <Button className='searchBox' variant="contained" onClick={this.handleEditModalOpen.bind(this)}>
                    Edit
                </Button>
                <ExpecationModal 
                    open={this.state.editModalOpen}
                    close={this.handleEditModalClose.bind(this)}
                    data={this.props.data}
                /> */}
            </div>
        )
    }
}

export default FilterPane;