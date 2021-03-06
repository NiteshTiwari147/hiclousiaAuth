import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as actions from '../../actions';
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import './styles.css';

class EducationForm extends Component {
    constructor(props) {
        super(props);

        this.state = { errors: [], institute: '', course: '', field_of_course: '', start_year: '', end_year: '', grade: '', industry: ''}
    }
    addEducation() {
        this.props.sendEducationInfo({          
            value: {
                institute: this.state.institute,
                course: this.state.course,
                field_of_course: this.state.field_of_course,
                startDate: this.state.start_year,
                endDate: this.state.end_year,
                industry: this.state.industry,
                grade: this.state.grade
            }      
        })
        .then(res => window.location.reload());
    }
    submitEducation() {
        this.props.sendEducationInfo({          
            value: {
                institute: this.state.institute,
                course: this.state.course,
                field_of_course: this.state.field_of_course,
                startDate: this.state.start_year,
                endDate: this.state.end_year,
                industry: this.state.industry,
                grade: this.state.grade
            }      
        })
    }
    render(){
        return(
            <div className='form_container'>
            <div className='form_title'>
                <h3>Fill Education Information</h3>
            </div>
            <div className="row">
            <form className="col s16 formContent">
                <div className="form_inputBox input-field">
                    <div className='formLabel_title'>
                        Institute
                    </div>
                    <div className='formInput'>
                        <input 
                            placeholder="Enter Institute name"
                            value={this.state.institute}
                            onChange={ e => this.setState({ institute: e.target.value })}
                        />    
                    </div>                    
                </div>
                <div className="form_inputBox input-field">
                    <div className='formLabel_title'>
                        Course
                    </div>
                    <div className='formInput'>
                        <input 
                            placeholder="Enter Course name"
                            value={this.state.course}
                            onChange={ e => this.setState({ course: e.target.value })}
                        />    
                    </div>                    
                </div>
                <div className="form_inputBox input-field">
                    <div className='formLabel_title'>
                        Field of course
                    </div>
                    <div className='formInput'>
                        <input 
                            placeholder="Enter Field of course"
                            value={this.state.field_of_course}
                            onChange={ e => this.setState({ field_of_course: e.target.value })}
                        />    
                    </div>                    
                </div>
                <div className="form_inputBox input-field">
                    <div className='formLabel_title'>
                        Year of starting
                    </div>
                    <div className='formInput'>
                        <Datepicker selected={this.state.start_year} onChange={(date) => this.setState({ start_year: date})} 
                            dateFormat='dd/MM/yyyy' isClearable showYearDropdown scrollableYearDropdown placeholderText="DD/MM/YYYY"
                        />      
                    </div>                    
                </div>
                <div className="form_inputBox input-field">
                    <div className='formLabel_title'>
                        Year of ending
                    </div>
                    <div className='formInput'>
                        <Datepicker selected={this.state.end_year} onChange={(date) => this.setState({ end_year: date})} 
                            dateFormat='dd/MM/yyyy' isClearable showYearDropdown scrollableYearDropdown placeholderText="DD/MM/YYYY"
                        />   
                    </div>                    
                </div>
                <div className="form_inputBox input-field">
                    <div className='formLabel_title'>
                        Grade
                    </div>
                    <div className='formInput'>
                        <input 
                            placeholder="Enter Grade"
                            value={this.state.grade}
                            onChange={ e => this.setState({ grade: e.target.value })}
                        />    
                    </div>                    
                </div>
                <div className='btnOption'>
                    <button className="btn" onClick={this.submitEducation.bind(this)}><a href='/surveys' className='linkBtn'> Submit And Go
                    </a></button>
                    <button className="btn" onClick={this.addEducation.bind(this)}>Add New Education</button>
                </div>
            </form>
        </div>
        </div>
        )
    }
};

export default connect(null, actions)(EducationForm);