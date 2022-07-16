import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Dashboard from './Pages/Dashboard';
import Jobs from './Pages/Jobs';
import CandidateForm from './Forms/CandidateForm';
import ProjectForm from './Forms/ProjectForm';
import EducationForm from './Forms/EducationForm';
import ExperienceForm from './Forms/ExperienceForm';
import gateway from './utils/gateway';
import Candidates from './Pages/Candidates';
import SignUp from './SignUp';

const signUp = () => <SignUp />

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchCandidate();
        this.props.fetchEducation();
        this.props.fetchExperience();
        this.props.fetchProject();
        this.props.fetchSkillSet();
    }
    
    render() {
        return (
            <div className='container'>
                <BrowserRouter>
                   <div>    
                        <Header />
                        <Route exact path="/" component={signUp} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/jobs" component={Jobs} />
                        <Route exact path="/candidates" component={Candidates} />
                        <Route exact path="/surveys" component={gateway} />
                        <Route exact path="/form" component={CandidateForm} />
                        <Route exact path="/projectForm" component={ProjectForm} />
                        <Route exact path="/educationForm" component={EducationForm} />
                        <Route exact path="/experienceForm" component={ExperienceForm} />
                   </div>
                </BrowserRouter>
            </div>
        )
    }
};

export default connect(null, actions)(App);