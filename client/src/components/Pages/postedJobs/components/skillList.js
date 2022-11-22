import React, { Component } from 'react';

class MatchedSkills extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { skills } = this.props;
        if(skills.length > 0 ) {
            return skills.map(skill => <label style={{marginRight: '1rem', fontSize:'12px'}}>{skill}</label>)
        }
    }
}

export default MatchedSkills;
