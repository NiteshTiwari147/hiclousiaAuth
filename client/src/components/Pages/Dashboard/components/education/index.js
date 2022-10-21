import React, { Component } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import Divider from '@mui/material/Divider';
import Button from  '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import EducationListingModal from './listingModal';

import './styles.css';


class Education extends Component {

    constructor(props) {
        super(props);
        this.state = { modalOpen: false}
    };

    handleModalOpen() {
        this.setState({modalOpen: true})
    }

    handleModalClose() {
        this.setState({modalOpen: false})
    }

    renderEducation(course, study, institute, grade) {
        return <div>
            <div className='educationContent'>
            <div className='educationIcon'>
                <SchoolIcon sx={{ fontSize: 30 }}/>
            </div>
            <div className='educationInfo'>
                <div className='educationInstitute'>
                    {institute.toUpperCase()}
                </div>
                <div className='educationCourse'>
                    {course.toUpperCase()}
                </div>
                <div className='educationStudy'>
                    {study.toUpperCase()}
                </div>
            </div>
            </div>
            <Divider />
            <div className='educationGrade'>
                <div>
                    Grade:
                </div>
                <div className='grade'>
                    {grade}
                </div>
            </div>
            <Divider color='skyblue'/>
        </div>
}
    render() {
        const isEmpty = this.props.isEmpty;

        if(isEmpty) {
            return  <div className='educationContainer shadow' >
                <h5 style={{"color": "#1072EB"}}>Education</h5>
                <Divider color='skyblue'/>
                <p>You have not added any education</p>
            </div>
        }
        const educationList = this.props.data
        return (
            <div className='educationContainer shadow' >
                <div className='educationContainerTitle'>
                    <h6 style={{"color": "#1072EB"}}>Education</h6>
                    <Button size='small' onClick={this.handleModalOpen.bind(this)}>
                        <EditIcon size='small' />
                    </Button>
                </div>
                <Divider color='skyblue'/>
                {educationList.map(education => this.renderEducation(education.course,
                    education.field_of_course,
                    education.institute,
                    education.grade))}
                <EducationListingModal 
                open={this.state.modalOpen}
                close={this.handleModalClose.bind(this)}
                list={educationList}
                />
            </div>
        )
    }
}

export default Education;