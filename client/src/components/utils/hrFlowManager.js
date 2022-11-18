import React, { Component } from 'react';
import { connect } from 'react-redux';

import Onboarding from './onBoardingHR';
import LoadingScreen from './loadingScreen';
import EmployerDashboard from '../Pages/employerDashboard';

class HRFlowManager extends Component { 

    render() {

        if(this.props.auth && this.props.hr === false) {
            return <Onboarding />
        }

        if(this.props.auth && this.props.hr) {
            return <EmployerDashboard />
        }

        return <LoadingScreen />
        
    }
}

function mapStateToProps({auth, hr}) {
    return { auth, hr }
}

export default connect(mapStateToProps)(HRFlowManager);