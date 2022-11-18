import React, { Component } from 'react';
import { connect } from 'react-redux';

import Onboarding from './onBoardingCandidate';
import CandidateHome from '../Pages/Home/Candidate';
import LoadingScreen from './loadingScreen';
import SignUp from '../SignUp';
import Dashboard from '../Pages/Dashboard';

class FlowManager extends Component {

    constructor(props) {
        super(props);

    }

    render() {  
        if(this.props.auth && this.props.candidate === false) {
            return <Onboarding />
        }

        if(this.props.auth && this.props.candidate) {
            return <Dashboard />
        }

        return <LoadingScreen />
        
    }
}

function mapStateToProps({auth, candidate}) {
    return { auth, candidate }
}

export default connect(mapStateToProps)(FlowManager);