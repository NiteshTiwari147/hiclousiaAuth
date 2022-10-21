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
import LoadingScreen from '../../utils/loadingScreen';
import CompentencyPieChart from '../../visualization/compentencyChart';

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

    calculateExperience(experience) {
        console.log("data ", experience);
        let yr=0;
        let mo=0;
        experience.map(exp => {
            yr+=exp.industryExperience.yr;
            mo+=exp.industryExperience.mo;
        })
        yr = yr + parseInt(mo/12);
        mo = mo%12;
        return {yr, mo};
    }

    renderATS() {
        if(this.props.project && this.props.skillSet && this.props.experience) {
           const {yr, mo} = this.calculateExperience(this.props.experience)
            return <ATS projectLen={this.props.project.length} skills={this.props.skillSet.coreSkills.length} experienceYears={yr} experienceMonths={mo} />
        }
    }

    render() {
        if(this.props.skillSet && this.props.candidate) {
            const {project, skillSet, candidate, education, experience } = this.props
            return (
                <div className='dashboardLayout'>
                    <div className='dashboardStack'>
                        {this.renderCandidateInfo(candidate)}
                        {experience && experience.length > 0 ? <ExperienceTab data={experience} isEmpty={false} /> : 
                        <ExperienceTab data={experience} isEmpty={true} />}
                        {education && education.length > 0 ? <Education data={education} isEmpty={false} /> : 
                        <Education data={education} isEmpty={true} />}
                    </div>
                    <div className='dashboardStack'>
                        {this.renderATS()}
                        <FormBar />
                        {project ? project.map((value,index) => <Project key={index} idx={index} data={value} isEmpty={false} /> ) : 
                         <Project data={null} isEmpty={true} />    
                        }
                    </div>
                    <div className='dashboardStack'>
                        <div>
                            <SkillPieChart data={skillSet.coreSkills} />
                            <CompentencyPieChart />
                            {skillSet.coreSkills ? <Certificate data={skillSet.coreSkills} isEmpty={false} /> : 
                            <Certificate data={skillSet.coreSkills} isEmpty={true} />
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <LoadingScreen />
        }
        
    }
}

function mapStateToProps({candidate, education, experience, project, skillSet}) {
    return { candidate, education, experience, project, skillSet }
}

export default connect(mapStateToProps)(Dashboard);