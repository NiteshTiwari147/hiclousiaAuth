import React, { Component } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import Divider from '@mui/material/Divider';
import Button from  '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import EducationListingModal from './listingModal';
import EducationModal from '../../../../Forms/educationModal';

import './styles.css';


class Education extends Component {

    constructor(props) {
        super(props);
        this.state = { educationModalOpen: false,
        modalOpen: false}
    };

    handleEducationModalOpen() {
        this.setState({educationModalOpen: true})
    }
    handleEducationModalClose() {
        this.setState({educationModalOpen: false})
    }

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
                {institute && <div className='educationInstitute'>
                    {institute.toUpperCase()}
                </div>}
                {course && <div className='educationCourse'>
                    {course.toUpperCase()}
                </div>}
                {study && <div className='educationStudy'>
                    {study.toUpperCase()}
                </div>}
            </div>
            </div>
            <Divider />
            <div className='educationGrade'>
                <div>
                    Grade:
                </div>
                {grade && <div className='grade'>
                    {grade}
                </div>}
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
                <div style={{marginTop: '1rem'}}>
                    <Button variant='contained' color='success' size='small' onClick={this.handleEducationModalOpen.bind(this)}>
                        Please add education
                    </Button>
                </div>
                <EducationModal open={this.state.educationModalOpen} close={this.handleEducationModalClose.bind(this)} />
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
                <div style={{marginTop: '1rem'}}>
                    <Button variant="contained" color='success' size='medium' onClick={this.handleEducationModalOpen.bind(this)}>
                        Add Education
                    </Button>
                </div>
                <EducationModal open={this.state.educationModalOpen} close={this.handleEducationModalClose.bind(this)} />
            </div>)
        } 
}

export default Education;