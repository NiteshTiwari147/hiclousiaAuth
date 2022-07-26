import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import * as actions from '../../actions';

import './styles.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  height: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid white',
  borderRadius: '15px',
  boxShadow: '2px 2px #1072EB',
  p: 4,
};

class EducationModal extends Component {

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
              grade: this.state.grade
          }      
      })
      .then(res => window.location.reload());
  }
    render() {
      return (
        <div>
          <Modal
            open={this.props.open}
            onClose={this.props.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className='form_container'>
                <div className='form_title'>
                    <h5>Fill Education Information</h5>
                </div>
                <div className="row">
                  <form className="col s16 formContent">
                      <div className='inputBoxColumn'>
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
                                Programme   
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter Programme name"
                                    value={this.state.course}
                                    onChange={ e => this.setState({ course: e.target.value })}
                                />    
                            </div>                    
                        </div>
                      </div>
                      <div className='inputBoxColumn'>
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
                      </div>
                      <div className='inputBoxColumn'>
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
                      </div>
                      <div className='btnOption'>
                        <Button variant='contained' size='medium' onClick={this.submitEducation.bind(this)}>
                          Save
                        </Button>
                      </div>
                  </form>
                </div>
              </div>
            </Box>
          </Modal>
      </div>)}; 
}

export default connect(null, actions)(EducationModal);