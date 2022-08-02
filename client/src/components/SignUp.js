import React, { Component } from 'react';
import Button from  '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';
import * as actions from '../actions';

import logo from '../data/signuplogo.png';
import googleIcon from '../data/googleIcon.svg';
import './styles.css'

class SignUp extends Component {
    handleClick() {
        this.props.fetchEducation()
    }
    render() {
        return (
            <div className='signUp'>  
                <div className='signUpLogo'>
                    <img className='signUpImage' src={logo} alt="Avatar"/>
                    <div style={{textAlign: 'center', color: '#1272EB', fontFamily: 'sans-serif'}}>
                        <h4>Join us and take your career</h4>
                        <h3>to the sky</h3>
                    </div>                
                </div>
                <div className='signUpForm shadow'>
                    <div style={{textAlign: 'center', color: '#1272EB', fontFamily: 'sans-serif'}}>
                        <h4 style={{color: '#1272EB !important'}}>Let's get started</h4>
                    </div>
                    <div className='loginBox'>
                        <div style={{textAlign: 'center', fontFamily: 'sans-serif'}}>
                            <h5>Sign In with Google</h5>
                        </div>
                        <div className='shadow signupbtn'>
                            <Button onClick={this.handleClick.bind(this)}>
                                <a href='/auth/google'>
                                    <img className='googleIcon'href='/auth/google' src={googleIcon} alt="Avatar"/>
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default connect(null, actions)(SignUp);