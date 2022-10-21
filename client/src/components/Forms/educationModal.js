import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
  width: '40%',
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

    this.state = { errors: [], 
      institute: this.props.data ? this.props.data.institute : 'select' ,
      id: this.props.data ? this.props.data.id : '',
      instituteName: '',
      course: this.props.data ? this.props.data.course : 'select', 
      field_of_course: this.props.data ? this.props.data.field_of_course : '', 
      start_year: this.props.data ? new Date(this.props.data.start_year) : '',  
      end_year: this.props.data ? new Date(this.props.data.end_year) : '',  
      grade: this.props.data ? this.props.data.grade : '',  
      industry: this.props.data ? this.props.data.industry : ''
    }
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
    if(this.props.edit) {
      this.props.updateEducationInfo({          
        value: {
            id: this.state.id,
            institute: this.state.institute,
            course: this.state.course,
            field_of_course: this.state.field_of_course,
            startDate: this.state.start_year,
            endDate: this.state.end_year,
            grade: this.state.grade
        }      
      })
      .then(res => {
        this.props.fetchEducation();
        this.props.close();
      });
    }
    else {
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
      .then(res => {
        this.props.fetchEducation();
        this.props.close();
      });
    }
  }

  handleUniversityTypeChange(event) {
    this.setState({institute: event.target.value})
  }

  handleDegreeTypeChange(event) {
    this.setState({course: event.target.value})
  }
    render() {
      return (
        <div id="nitesh">
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
                <form className="col s16 formContent">
                      <div className='inputBoxColumn'>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Awarding Authority
                            </div>
                            <div className='formInput'>
                              <Select
                                id="universityTypeSelect"
                                value={this.state.institute}
                                fullWidth
                                variant="outlined"
                                onChange={this.handleUniversityTypeChange.bind(this)}
                                >
                                <MenuItem value={'select'}>Select university</MenuItem>
                                <MenuItem value={'iit'}>IITs</MenuItem>
                                <MenuItem value={'nit'}>NITs</MenuItem>
                                <MenuItem value={'central'}>Central university</MenuItem>
                                <MenuItem value={'govt'}>Govt. university</MenuItem>
                                <MenuItem value={'private'}>Private</MenuItem>
                              </Select>  
                            </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Degree Type   
                            </div>
                            <div className='formInput'>
                              <Select
                              id="universityTypeSelect"
                              value={this.state.course}
                              fullWidth
                              variant="outlined"
                              onChange={this.handleDegreeTypeChange.bind(this)}
                              >
                                <MenuItem value={'select'}>Select Degree type</MenuItem>
                                <MenuItem value={'doctorate'}>Doctrate</MenuItem>
                                <MenuItem value={'masters'}>Masters</MenuItem>
                                <MenuItem value={'bachelor'}>Bachelor</MenuItem>
                                <MenuItem value={'pg diploma'}>PG diploma</MenuItem>
                                <MenuItem value={'diploma'}>Diploma</MenuItem>
                              </Select> 
                            </div>                    
                        </div>
                      </div>
                      <div className='inputBoxColumn'>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Field of Degree
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
                      <div className='inputBoxColumn' style={{flexDirection: 'column', width: '90%'}}>
                        <div className='formLabel_title'>
                                  Institute Name
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter institure name"
                                value={this.state.instituteName}
                                onChange={ e => this.setState({ instituteName: e.target.instituteName })}
                            />    
                        </div> 
                        </div>
                      <div className='btnOption'>
                        <Button variant='contained' size='medium' onClick={this.submitEducation.bind(this)}>
                          Save
                        </Button>
                      </div>
                  </form>
              </div>
            </Box>
          </Modal>
      </div>)}; 
}

export default connect(null, actions)(EducationModal);