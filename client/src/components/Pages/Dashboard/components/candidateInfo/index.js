import React, { Component } from 'react';

import './styles.css';
import avatar from '../../../../../data/avatarMan.jpg';

class CandidateInfo extends Component {

    render() {
        const url = [
            {
                link: 'https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_960_720.png'
            },
            {
                link: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80"
            },
            {
                link: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'
            }
        ]
        const {name,email, currentEmploymnt} = this.props
        return (
            <div className='basicInfoContainer shadow'>
                <img className="profilePic" src={avatar} alt="Avatar"/>
                <h5 className="profileName">{name}</h5>
                <h7 className="profilePosition">{email}</h7>
                <text className="profilePosition">{currentEmploymnt.designation} at {currentEmploymnt.company}</text>
            </div>
        )
    }
}

export default CandidateInfo;