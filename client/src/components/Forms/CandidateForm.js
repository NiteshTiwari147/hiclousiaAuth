import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Select from 'react-select';


class CandidateForm extends Component {

    constructor(props) {
        super(props);

        this.state = { errors: [], Name: '', dateofbirth: '', phone: '',isvalid: false, applyingfor: '', experience: '',
        selectOptions : [],id: "",name: '',MartialSelectoptions : [], Id:'', sttatus:'', nationality: '', address: '', city: '', states: '', zip: ''}
    }

    
    addCandidateInfo() {
        this.props.sendBasicInfo({          
            value: {
                name: this.state.Name,
                dateOfBirth: this.state.dateofbirth,
                phone: this.state.phone,
                applyingFor: this.state.applyingfor,
                experience: this.state.experience,
                nationality: this.state.nationality,
                address: this.state.address,
                city: this.state.city,
                state: this.state.states,
                zip: this.state.zip,
            }      
        });
    }


    async getOptions(){
        const genderData = [
            {
                id: 0,
                name: 'Male'
            },
            {
                id: 1,
                name: "Female"
            }
        ];
        const martialData = [
            {
                Id: 0,
                sttatus: 'Yes'
            },
            {
                Id: 1,
                sttatus: 'No'
            }
        ];
        
        const genderoptions = genderData.map(d => ({
          "value" : d.id,
          "label" : d.name
    
        }))
        const  Martialoptions = martialData.map(e => ({
            "value" : e.Id,
            "label" : e.sttatus
        }))
    
        this.setState({selectOptions: genderoptions})
        this.setState({MartialSelectoptions: Martialoptions})
      }
    componentDidMount(){
           this.getOptions()
       }
     
    render() {
        return (
            <div className='form_container'>
            <div className='form_title'>
                <h3>Fill Basic Information</h3>
            </div>
            <div className="row formContent">
                <form className="col s16"S>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Name :
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter Your Name"
                                value={this.state.Name}
                                onChange={ e => this.setState({ Name: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Date of Birth :
                        </div>
                        <div className='formInput'>
                            <Datepicker selected={this.state.dateofbirth} onChange={(date) => this.setState({ dateofbirth: date})} 
                                dateFormat='dd/MM/yyyy' isClearable showYearDropdown scrollableYearDropdown placeholderText="DD/MM/YYYY"
                            />   
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            phone :
                        </div>
                        <div className='formInput'>
                            <PhoneInput
                                defaultCountry="IN"
                                placeholder="Enter phone number"
                                value={this.state.phone}
                                onChange={(e) => {
                                    this.setState({ phone: e });
                                }}
                            />
                            { this.state.isvalid && <label>Invalid Number</label>}  
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Applying For :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.applyingfor}
                                onChange={ e => this.setState({ applyingfor: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Experience :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.experience}
                                onChange={ e => this.setState({ experience: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Nationality :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.nationality}
                                onChange={ e => this.setState({ nationality: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Address :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.address}
                                onChange={ e => this.setState({ address: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            City :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.city}
                                onChange={ e => this.setState({ city: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            State :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.states}
                                onChange={ e => this.setState({ states: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Zip :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.zip}
                                onChange={ e => this.setState({ zip: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className='btnOption'>
                        <button className="btn" onClick={this.addCandidateInfo.bind(this)}><a href='/surveys' className='linkBtn'>
                            Submit
                        </a></button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
};

export default connect(null, actions)(CandidateForm);