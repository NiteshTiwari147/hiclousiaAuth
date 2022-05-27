import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class CandidateForm extends Component {

    constructor(props) {
        super(props);

        this.state = { errors: [], firstName: '', lastName: '', age: '', location: '', contactNumber: '', address: ''}
    }
    componentDidMount() {
        this.props.sendBasicInfo({          
            value: {
                firstName: 'Nitesh',
                lastName: 'Tiwari',
                age: '26',
                location: 'bangalore',
                contactNumber: '9131373287',
                address: 'gwalior'
            }      
        });
    }
    onSubmit() {
        this.props.sendBasicInfo({          
            value: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                age: this.state.age,
                location: this.state.location,
                contactNumber: this.state.contactNumber,
                address: this.state.address
            }      
        });
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
                            First Name:
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter First Name"
                                value={this.state.firstName}
                                onChange={ e => this.setState({ firstName: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Last Name:
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter Last Name"
                                value={this.state.lastName}
                                onChange={ e => this.setState({ lastName: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Age:
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter your age"
                                value={this.state.age}
                                onChange={ e => this.setState({ age: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Location:
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter your location"
                                value={this.state.location}
                                onChange={ e => this.setState({ location: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Contact Number :
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter your contact number"
                                value={this.state.contactNumber}
                                onChange={ e => this.setState({ contactNumber: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Address:
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter your address "
                                value={this.state.address}
                                onChange={ e => this.setState({ address: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <button className="btn"><a href='/surveys' className='linkBtn'>
                        Submit
                    </a></button>
                </form>
            </div>
        </div>
        )
    }
};

export default connect(null, actions)(CandidateForm);