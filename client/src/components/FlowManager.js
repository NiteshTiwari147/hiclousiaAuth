import React, { Component } from 'react';
import { connect } from 'react-redux';

import Landing from './Landing';
import CandidateHome from './Pages/Home/Candidate';

class FlowManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            candidate: this.props.candidate,
            skillSet: this.props.skillSet
        }
    }

    componentDidMount() {
        this.setState({
            auth: this.props.auth,
            candidate: this.props.candidate,
            skillSet: this.props.skillSet
        })
    }

    renderComponent() {


    }
    render() {
        if(this.props.auth && (!this.props.candidate || !this.props.skillSet)) {
            return <Landing />
        }

        if(this.props.auth && this.props.candidate && this.props.skillSet && this.props.skillSet.coreSkills.length > 0) {
            return <CandidateHome />
        }
        
    }
}

function mapStateToProps({auth, candidate, skillSet}) {
    return { auth, candidate, skillSet }
}

export default connect(mapStateToProps)(FlowManager);