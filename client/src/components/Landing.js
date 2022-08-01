import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import ExpectationForm from './Forms/expectationForm';
import SkillForm from './Forms/SkillForm';
import LoadingScreen from './utils/loadingScreen';

import formIcon from '../data/formImage.jpg';
import candidate from '../data/avatarMan.jpg';
import recruiter from '../data/recruiterIcon.jpg';
import './styles.css';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonClicked: false,
            gender: 'male',
            age: '25',
            role: 'candidate'
        }
    }

    handleAgeChange(event) {
        this.setState({
            age: event.target.value
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
            return <div style={{textAlign: 'center', color: '#1272EB', fontFamily: 'cursive', width: '30rem'}} className='shadow'>
                <h4>
                    Tell us about yourself, {this.props.auth.name.toUpperCase()}
                </h4>
                <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center', marginTop: '2rem'}}>      
                    <TextField id="outlined-basic" label="Your age" size='small' variant="standard" 
                    value={this.state.age}
                    onChange={this.handleAgeChange.bind(this)}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center', marginTop: '2rem'}}>
                    <label style={{marginRight: '1rem'}}>
                        <h5>Gender :</h5> 
                    </label>
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
                <div>
                    <label><h5>What is your role ?</h5></label>
                    <div className='userOptionPane'>
                        <button className='userBox shadow' onClick={this.handleCandidateButton.bind(this)}>
                            <img className="userIcon" src={candidate} alt="Avatar"/>
                            <h5 className='userTitle'>Candidate</h5>
                        </button>
                        <button className='userBox shadow'>
                            <img className="userIcon" src={recruiter} alt="Avatar"/>
                            <h5 className='userTitle'>Recruiter</h5>
                        </button>
                    </div>
                </div>
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
        console.log('cdsml', this.props);
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
                        <h3 style={{textAlign: 'center', fontFamily: "cursive"}}>Help us in knowing you better</h3>
                        {this.renderSubmitButton()}
                    </div>
                    <div className='basicFormPage2'>
                        <ExpectationForm name={this.props.auth ? this.props.auth.name : 'user'} age={this.state.age} gender={this.state.gender} role={this.state.role} />
                        <Divider orientation="vertical" flexItem />
                        <SkillForm />
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