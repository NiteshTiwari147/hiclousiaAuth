import React, { Component } from 'react';
import Box from '@mui/material/Box';
import { withRouter } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from  '@mui/material/Button';
import { connect } from 'react-redux';
import * as actions from '../actions';

import logo from '../data/signuplogo.png';
import './styles.css'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: false,
            password: '',
            repassword: '',
            color: 'error',
            text: '',
            showPassword: false,
            showRepassword: false
        }
    }

    handleSignUp() {
        if(this.state.password == this.state.repassword) {
            this.props.signUp({
                value: {
                    email: this.state.email,
                    password: this.state.password,
                    role: localStorage.getItem("role")
                }
            })
            .then( res => {
                const { data } = res;
                if(data.err) {
                    this.setState({error: true, email: '', password: ''});
                } else {
                    if(data.user.role == 'HR') {
                        this.props.history.push("hr/onboarding");
                    } else {
                        this.props.history.push("talent/onboarding");
                    }
                }
            })
        }
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value})
    };

    handleRepasswordChange = (event) => {
        this.setState({repassword: event.target.value})
        setTimeout(() => {
            if(this.state.password == this.state.repassword) {
                this.setState({color: 'success'});
            } else {
                this.setState({color: 'error'});
            }
        }, 1000);   
    };
    
    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword})
    };

    handleClickShowRePassword = () => {
        this.setState({showRepassword: !this.state.showRepassword})
    };
    
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItem: 'center'}}>
                        <div style={{textAlign: 'center', color: '#1272EB', fontFamily: 'sans-serif', fontWeight: 1000}}>
                            <h5>Creating an account</h5>
                        </div>
                        {this.state.error && <div style={{textAlign: 'center', color: 'red', fontFamily: 'sans-serif'}}>
                            <p>Something went wrong</p>
                        </div>}
                        <TextField sx={{ m: 1, width: '25ch'}} id="outlined-basic" label="Email" variant="outlined" onChange={this.handleEmailChange.bind(this)} />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handlePasswordChange.bind(this)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword.bind(this)}
                                    onMouseDown={this.handleMouseDownPassword.bind(this)}
                                    edge="end"
                                    >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Re-enter password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={this.state.showRepassword ? 'text' : 'password'}
                                value={this.state.repassword}
                                onChange={this.handleRepasswordChange.bind(this)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowRePassword.bind(this)}
                                    onMouseDown={this.handleMouseDownPassword.bind(this)}
                                    edge="end"
                                    >
                                    {this.state.showRepassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <div>
                            <label>Matching :</label>
                            <Button  variant="contained" color={this.state.color} sx={{ m: 1, width: '6ch'}}></Button>
                        </div>
                       
                        <Button variant="contained" sx={{ m: 1, width: '28ch'}} color='primary' onClick={this.handleSignUp.bind(this)}>Sign up</Button>
                        <Button variant="outlined" sx={{ m: 1, width: '28ch'}} color='primary'>Sign up with google</Button>
                        <Divider  sx={{ m: 1, width: '28ch'}} />
                    </Box>
                </div>
            </div>
        )
    }
};

export default withRouter(connect(null, actions)(SignUp));