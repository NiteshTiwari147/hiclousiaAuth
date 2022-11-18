import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Footer from './Footer';
import Dashboard from './Pages/Dashboard';
import Jobs from './Pages/Jobs';
import CandidateHome from './Pages/Home/Candidate';
import ProjectForm from './Forms/ProjectForm';
import EducationForm from './Forms/EducationForm';
import ExperienceForm from './Forms/ExperienceForm';
import gateway from './utils/gateway';
import Candidates from './Pages/Candidates';
import Welcome from './Pages/Welcome';
import SignUp from './SignUp';
import onBoardingTalent from './utils/onBoardingCandidate';
import PostedJob from './Pages/postedJobs';
import EmployerDashboard from './Pages/employerDashboard';
import candidateLogin from './Pages/signIn/candidateLogin';
import hrLogin from './Pages/signIn/hrLogin';
import onBoardingHR from './utils/onBoardingHR';

const signUp = () => <SignUp />

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }
    
    render() {
        return (
            <div className='container'>
                <BrowserRouter>
                   <div>    
                        <Header />
                        <Route exact path="/signup" component={signUp}></Route>
                        <Route exact path="/" component={Welcome} />
                        <Route exact path="/talent/login" component={candidateLogin} />
                        <Route exact path="/talent/onboarding" component={onBoardingTalent} />
                        <Route exact path="/hr/onboarding" component={onBoardingHR} />
                        <Route exact path="/talent/dashboard" component={gateway} />
                        <Route exact path="/hr/login" component={hrLogin} />             
                        <Route exact path="/home" component={gateway} />
                        <Route exact path="/careerprofile" component={CandidateHome} />
                        <Route exact path="/hr/dashboard" component={gateway} />
                        <Route exact path="/employer/postedJob" component={PostedJob} />

                        <Route exact path="/jobs" component={Jobs} />
                        <Route exact path="/candidates" component={Candidates} />
                        <Route exact path="/projectForm" component={ProjectForm} />
                        <Route exact path="/educationForm" component={EducationForm} />
                        <Route exact path="/experienceForm" component={ExperienceForm} />
                        <Footer />
                   </div>
                </BrowserRouter>
            </div>
        )
    }
};

export default connect(null, actions)(App);