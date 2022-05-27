import React, { Component } from 'react';

import './styles.css'

class SignUp extends Component {
    render() {
        console.log('afpojpcsm')
        return (
            <div className='signUp'>  
                <div className='signUpTitle'>
                    <h1>Hello !!!</h1>
                    <h2>Welcome to Hiclousia, Want to updrage yourself. Hop In !!! </h2>
                </div>
                <div>
                    <a href="/auth/google" className='updateCardContainer shadow signupbtn'>
                        Sign Up
                    </a>
                </div>
            </div>
        )
    }
};

export default SignUp;