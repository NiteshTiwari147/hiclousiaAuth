import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from  '@mui/material/Button';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import logo from '../../../data/signuplogo.png';
import googleIcon from '../../../data/googleIcon.svg';
import './styles.css'

class CandidateLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: false,
            password: '',
            showPassword: false,
        }
    }

    handleSubmit() {
        this.props.logIn({
            value: {
                email: this.state.email,
                password: this.state.password
            }
        })
        .then( res => {
            const { data } = res;
            if(data.err) {
                this.setState({error: true, email: '', password: ''});
            } else {
                this.props.history.push("/talent/dashboard");
            }
        })
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value, error: false})
    }

    handleChange = (event) => {
        this.setState({password: event.target.value, error: false})
    };
    
    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword})
    };
    
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleRole = () => {
        localStorage.setItem("role", "candidate");
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
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItem: 'center'}}>
                        <div style={{textAlign: 'center', color: '#1272EB', fontFamily: 'sans-serif', fontWeight: 1000}}>
                            <h5>Login in to Hiclousia</h5>
                        </div>
                        {this.state.error && <div style={{textAlign: 'center', color: 'red', fontFamily: 'sans-serif'}}>
                            <p>Credentials are incorrect</p>
                        </div>}
                        <TextField value={this.state.email} sx={{ m: 1, width: '25ch'}} id="outlined-basic" label="Email" variant="outlined" onChange={this.handleEmailChange.bind(this)} />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChange.bind(this)}
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
                        <Button variant="contained" sx={{ m: 1, width: '28ch'}} color='primary' onClick={this.handleSubmit.bind(this)}>Login</Button>
                        <Button variant="outlined" sx={{ m: 1, width: '28ch'}} color='primary'>
                            <a  href="/auth/google/talent">Sign in with google</a>
                        </Button>
                        <Divider  sx={{ m: 1, width: '28ch'}} />
                        <Button variant="contained" sx={{ m: 1, width: '28ch'}} color='primary' onClick={this.handleRole.bind(this)}>
                            <a href='/signup'>
                            Create an account
                            </a>
                        </Button>
                    </Box>
                </div>
            </div>
        )
    }
};

export default withRouter(connect(null, actions)(CandidateLogin));