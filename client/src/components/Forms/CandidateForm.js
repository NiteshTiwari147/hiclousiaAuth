import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Select from 'react-select';


class CandidateForm extends Component {

    constructor(props) {
        super(props);

        this.state = { errors: [], Name: '', dateofbirth: '', phone: '',isvalid: false, Applyingfor: '', Experience: '',
        selectOptions : [],id: "",name: '',MartialSelectoptions : [], Id:'', sttatus:'', Nationality: '', Address: '', City: '', states: '', zeep: ''}
    }

    
    onSubmit(e) {
    //    const isValid = this.phoneValidation();
    //    if( !isValid ) {   
    //         e.preventDefault();
    //         this.setState({isValid: true});
    //         return false;
    //    }
        this.props.sendBasicInfo({          
            value: {
                Name: this.state.Name,
                dateofbirth: this.state.dateofbirth,
                Phone: this.state.phone,
                Applyingfor: this.state.Applyingfor,
                Experience: this.state.Experience,
                Nationality: this.state.Nationality,
                Address: this.state.Address,
                City: this.state.City,
                State: this.state.states,
                Zip: this.state.zeep,
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

    phoneValidation() {
        if  (isValidPhoneNumber(this.state.phone)) {
            this.setState({isvalid: true})
        }
        else {
            this.setState({isvalid: false})
        }
    }

    ghandleChange(e){
        this.setState({id:e.value, name:e.label})
       }
    mhandleChange(e){
        this.setState({Id:e.value, sttatus:e.label})
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
                <form className="col s16" onSubmit={this.onSubmit.bind(this)} >
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
                                    this.phoneValidation();
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
                                value={this.state.Applyingfor}
                                onChange={ e => this.setState({ Applyingfor: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Experience :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.Experience}
                                onChange={ e => this.setState({ Experience: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Gender :
                        </div>
                            <div>
                                <Select options={this.state.selectOptions} onChange={this.ghandleChange.bind(this)} />
                            </div>
                        </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Martial Status :
                        </div>
                        <div>
                            <Select options={this.state.MartialSelectoptions} onChange={this.mhandleChange.bind(this)} />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Nationality :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.Nationality}
                                onChange={ e => this.setState({ Nationality: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Address :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.Address}
                                onChange={ e => this.setState({ Address: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            City :
                        </div>
                        <div className='formInput'>
                            <input 
                                value={this.state.City}
                                onChange={ e => this.setState({ City: e.target.value })}
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
                                value={this.state.zeep}
                                onChange={ e => this.setState({ zeep: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    { this.state.isvalid && <button className="btn"><a href='/surveys' className='linkBtn'>
                        Submit
                    </a></button>}
                </form>
            </div>
        </div>
        )
    }
};

export default connect(null, actions)(CandidateForm);