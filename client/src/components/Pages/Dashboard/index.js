import React, { Component } from 'react';
import { connect } from 'react-redux';

import CandidateInfo from './components/candidateInfo';
import ATS from './components/ATS';
import FormBar from './components/formBar';
import Project from './components/project';
import SkillPieChart from '../../visualization/skillPieChart';
import Education from './components/education';
import ExperienceTab from './components/experience';
import Certificate from './components/certificates';

import './styles.css';

class Dashboard extends Component {

    renderCandidateInfo(candidate) {
        const currentEmploymnt = {
            designation: 'SDE-2',
            company: 'PayPal'
        }
        if(candidate) {
            return <CandidateInfo name={candidate.name} email={candidate.email} currentEmploymnt={currentEmploymnt} />
        }
    }

    renderATS() {
        if(this.props.project && this.props.skillSet && this.props.candidate) {
            return <ATS projectLen={this.props.project.length} skills={this.props.skillSet.coreSkills.length} experience={this.props.candidate.experience} />
        }
    }

    render() {
        if(this.props.project && this.props.skillSet && this.props.candidate && this.props.education && this.props.experience) {
            const {project, skillSet, candidate, education, experience } = this.props
            return (
                <div className='dashboardLayout'>
                    <div className='dashboardStack'>
                        {this.renderCandidateInfo(candidate)}
                        <ExperienceTab data={experience} />
                        <Education data={education}/>
                    </div>
                    <div className='dashboardStack'>
                        {this.renderATS()}
                        <FormBar />
                        {project ? project.map((value,index) => <Project key={index} idx={index} data={value} /> ): null}
                    </div>
                    <div className='dashboardStack'>
                        <div>
                            <SkillPieChart data={skillSet.coreSkills} />
                            <Certificate data={skillSet.coreSkills}/>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <div>
                Please fill all the information
            </div>
        }
        
    }
}

function mapStateToProps({candidate, education, experience, project, skillSet}) {
    return { candidate, education, experience, project, skillSet }
}

export default connect(mapStateToProps)(Dashboard);