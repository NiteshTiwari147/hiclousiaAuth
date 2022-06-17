import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import CandidateForm from './Forms/CandidateForm';
import ProjectForm from './Forms/ProjectForm';
import EducationForm from './Forms/EducationForm';
import ExperienceForm from './Forms/ExperienceForm';
import gateway from './utils/gateway';
import SignUp from './SignUp';
const Dashboard = () => <SignUp />

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchCandidate();
        this.props.fetchEducation();
        this.props.fetchExperience();
        this.props.fetchProject();
    }
    
    render() {
        return (
            <div className='container'>
                <BrowserRouter>
                   <div>    
                        <Header />
                        <Route exact path="/" component={Dashboard} />
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