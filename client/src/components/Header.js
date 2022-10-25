import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import './styles.css';

class Header extends Component {

    renderContent() {

        switch (this.props.auth) {
            case null: 
                return <div class="right hide-on-med-and-down headerBtn">Loading...</div>
            case false: 
                return <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a className='headerBtn'>Products</a></li>
                    <li><a className='headerBtn'>About us</a></li>
                    <li><a className='headerBtn' href="/auth/google">Login</a></li>
                </ul>
            default: 
                return <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a className='headerBtn'>Products</a></li>
                    <li><a className='headerBtn'>About us</a></li>
                    {this.props.candidate && this.props.candidate.role === 'candidate' && <li><a className='headerBtn' href="/jobs">Jobs</a></li>}
                    {this.props.candidate && this.props.candidate.role === 'candidate' && <li><a className='headerBtn' href="/careerprofile">Career Profile</a></li>}
                    {this.props.candidate && this.props.candidate.role === 'recruiter' && <li><a className='headerBtn' href="/candidates">Talent</a></li>}
                    <li><a className='headerBtn' href="/home">Dashboard</a></li>
                    <li className='headerText' >{this.props.auth.email}</li>
                    <li><a className='headerBtn' href="/api/logout">Log Out</a></li>
                </ul>    
        }
    }
    render() {
        return (
            <nav className='navigationBar'>
                 <div className="navigationBarContent">
                    <div>
                        <Link to='/home' className="brand-logo companyLogo">
                            HICLOUSIA
                        </Link>
                    </div>
                    {/* <img src={reactImage} alt="" />; */}
                    <div className='nav-wrapper'>
                        <ul className='right'>
                            {this.renderContent()}
                        </ul>  
                    </div>
                 </div>
            </nav>
        )
    }
}

function mapStateToProps({auth, candidate}) {
    return { auth, candidate }
}

export default connect(mapStateToProps)(Header);