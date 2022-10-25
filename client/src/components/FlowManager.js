import React, { Component } from 'react';
import { connect } from 'react-redux';

import Landing from './Landing';
import CandidateHome from './Pages/Home/Candidate';
import LoadingScreen from './utils/loadingScreen';
import SignUp from './SignUp';
import Dashboard from './Pages/Dashboard';

class FlowManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            candidate: this.props.candidate,
        }
    }

    componentDidMount() {
        this.setState({
            auth: this.props.auth,
            candidate: this.props.candidate,
        })
    }

    render() {
        if(this.props.auth && this.props.candidate === false) {
            return <Landing />
        }

        if(this.props.auth && !this.props.candidate) {
            <LoadingScreen />
        }

        if(this.props.auth && this.props.candidate) {
            return <Dashboard />
        }

        return <SignUp />
        
    }
}

function mapStateToProps({auth, candidate}) {
    return { auth, candidate }
}

export default connect(mapStateToProps)(FlowManager);