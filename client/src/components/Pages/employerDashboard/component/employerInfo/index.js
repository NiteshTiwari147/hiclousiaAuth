import React, { Component } from "react";

import avatar from '../../../../../data/avatarMan.jpg';

class EmployerInfo extends Component {
    render () {
        const { name, companyName, city,email } = this.props.data;
        return (
            <div className='basicInfoContainer shadow'>
                <img className="profilePic" src={avatar} alt="Avatar"/>
                <h5 className="profileName">{name}</h5>
                <div style={{alignSelf: 'baseline'}}>
                    <label>Position:</label>
                    <text className="profilePosition">TA at {companyName}</text>
                </div>
                <div style={{alignSelf: 'baseline'}}>
                    <label>Location:</label>
                    <text className="profilePosition">{city}</text>
                </div>
                <div style={{alignSelf: 'baseline'}}>
                    <label>Contact:</label>
                    <h7 className="profilePosition">{email}</h7>
                </div>               
            </div>
        )
    }
}

export default EmployerInfo;