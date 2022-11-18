import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import TalentFlowManager from './talentFlowManager';
import LoadingScreen from './loadingScreen';
import EmployerDashboard from '../Pages/employerDashboard';
import HRFlowManager from './hrFlowManager';

class GateWay extends Component {

    componentDidMount() {
        this.props.fetchHR();
        this.props.fetchJobs();
        this.props.fetchCandidate();
        this.props.fetchEducation();
        this.props.fetchExperience();
        this.props.fetchProject();
        this.props.fetchSkillSet();
    }

    render() {
        if(this.props.auth && this.props.auth.role == 'candidate') {
            return <TalentFlowManager />
        } else if(this.props.auth && this.props.auth.role == 'HR') {
            return <HRFlowManager />
        }
        return <LoadingScreen />
    }
};

function mapStateToProps({auth, candidate}) {
    return { auth, candidate }
}

export default connect(mapStateToProps, actions)(GateWay);