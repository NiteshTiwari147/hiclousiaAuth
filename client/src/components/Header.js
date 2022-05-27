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
                    <li><a className='headerBtn' href="/auth/google">Login</a></li>
                </ul>
            default: 
                return <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li className='headerText' >{this.props.auth.email}</li>
                    <li><a className='headerBtn' href="/api/logout">Log Out</a></li>
                </ul>    
        }
    }
    render() {
        return (
            <nav className='navigationBar'>
                 <div className="navigationBarContent">
                    <div >
                        <Link to='/surveys' className="brand-logo companyLogo">
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