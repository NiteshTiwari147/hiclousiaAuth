import React, { Component } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import Divider from '@mui/material/Divider';

import './styles.css';



class Education extends Component {

    renderEducation(course, study, institute, grade) {
        return <div>
            <div className='educationContent'>
            <div className='educationIcon'>
                <SchoolIcon sx={{ fontSize: 30 }}/>
            </div>
            <div className='educationInfo'>
                <div className='educationInstitute'>
                    {institute}
                </div>
                <div className='educationCourse'>
                    {course}
                </div>
                <div className='educationStudy'>
                    {study}
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
                <h5 style={{"color": "#1072EB"}}>Education</h5>
                <Divider color='skyblue'/>
                {educationList.map(education => this.renderEducation(education.course,
                    education.field_of_course,
                    education.institute,
                    education.grade))}
            </div>
        )
    }
}

export default Education;