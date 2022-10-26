import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendBasicInfo } from '../actions/index';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import ExpectationForm from './Forms/expectationForm';
import CompositeForm from './Forms/CompositeForm';
import SkillForm from './Forms/SkillForm';
import LoadingScreen from './utils/loadingScreen';

import formIcon from '../data/formImage.jpg';
import './styles.css';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonClicked: false,
            gender: 'male',
            age: '',
            city: '',
            name: '',
            role: 'candidate'
        }
    }

    handleAgeChange(event) {
        this.setState({
            age: event.target.value
        })
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleGenderChange(event) {
        this.setState({
            gender: event.target.value
        })
    }

    handleCandidateButton() {
        this.setState({
            role: 'candidate'
        })
        this.setState({
            buttonClicked: true
        });
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
                            Please enter your age
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter your age"
                                value={this.state.age}
                                onChange={this.handleAgeChange.bind(this)}
                            />  
                        </div>                    
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center', marginTop: '2rem'}}>
                        <div className='formLabel_title' style={{marginRight: '1rem'}}>
                            Gender
                        </div>
                        <Select
                            id="genderSelect"
                            value={this.state.gender}
                            variant="outlined"
                            onChange={this.handleGenderChange.bind(this)}
                        >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>
                        </Select>
                    </div>

                    <Button size='large' variant='contained' color='primary' style={{width: '50%', marginTop: '2rem'}} onClick={this.handleCandidateButton.bind(this)}>
                        Save
                    </Button>
                </form> 
            </div>
        }
        else if (this.props.candidate === null) {
            return <LoadingScreen />
        }
        
        return <div className='signUp'>
            <div className='signUpTitle'>          
                <h1>Hello !!!</h1>
                <h1>Welcome to Hiclousia, Here we helps you in becoming your best</h1>
            </div>
            <div>
                <a href='/form' className='updateCardContainer shadow fillBox'>
                Fill you basic Information
                </a>
            </div>
        </div>
    }

    renderSubmitButton() {
        if(this.props.candidate && this.props.skillSet && this.props.skillSet.coreSkills.length > 0) {
           return  <Button size='small' variant='contained' color='success'>
                <a href='/home'>
                    Lets Go
                </a>
            </Button>
        }
    }
    render() {
        if(!this.state.buttonClicked) {
            return <div className='basicForm'>
            <div className='signUpLogo'>
                <img className='basicFormImage' src={formIcon} alt="Avatar"/>
            </div>
            {this.renderContent()}
       </div>}

        if(this.state.buttonClicked) {
            return (
                <div>
                    <div className='basicFormPage2Title'>
                        <h4 style={{textAlign: 'center', fontFamily: "sans-serif"}}>Hello, {this.state.name} !!</h4>
                    </div>
                    <div className='basicFormPage2'>
                        <ExpectationForm name={this.state.name} age={this.state.age} gender={this.state.gender} />
                    </div>
                </div>
            )}

        return <LoadingScreen />
    }
};

function mapStateToProps({auth, candidate, skillSet}) {
    return { auth, candidate, skillSet }
}

export default connect(mapStateToProps)(Landing);