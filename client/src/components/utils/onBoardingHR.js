import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import * as actions from '../../actions';
import ExpectationForm from '../Forms/expectationForm';
import LoadingScreen from './loadingScreen';

import formIcon from '../../data/formImage.jpg';
import '../styles.css';

class OnboardingHR extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company: '',
            city: '',
            name: '',
            role: 'HR'
        }
    }

    handleCompanyChange(event) {
        this.setState({
            company: event.target.value
        })
    }

    handleCityChange(event) {
        this.setState({
            city: event.target.value
        })
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleSubmitButton() {
        this.props.sendHRBasicInfo({
            value: {
                company: this.state.company,
                city: this.state.city,
                name: this.state.name
            }
        })
        .then(res => {
            this.props.history.push("/hr/dashboard");
        })
    }
    
    renderContent() {
        if(this.props.auth) {
            return <div style={{textAlign: 'center', fontFamily: 'sans-serif', width: '30rem'}} className='shadow'>
                <h5>
                    Please fill out your basic information 
                </h5>
                <form className="col s16 formContent">
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Please enter your name
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter your age"
                                value={this.state.name}
                                onChange={this.handleNameChange.bind(this)}
                            />  
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Please enter company name
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter your age"
                                value={this.state.company}
                                onChange={this.handleCompanyChange.bind(this)}
                            />  
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Please enter your city
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter your city"
                                value={this.state.city}
                                onChange={this.handleCityChange.bind(this)}
                            />  
                        </div>                    
                    </div>
                    <Button size='large' variant='contained' color='primary' style={{width: '50%', marginTop: '2rem'}} onClick={this.handleSubmitButton.bind(this)}>
                        Save
                    </Button>
                </form> 
            </div>
        }
    }
    render() {
        if(this.props.auth) {
            return <div className='basicForm'>
            <div className='signUpLogo'>
                <img className='basicFormImage' src={formIcon} alt="Avatar"/>
            </div>
            {this.renderContent()}
       </div>}

        return <LoadingScreen />
    }
};

function mapStateToProps({auth}) {
    return { auth }
}

export default withRouter(connect(mapStateToProps, actions)(OnboardingHR));