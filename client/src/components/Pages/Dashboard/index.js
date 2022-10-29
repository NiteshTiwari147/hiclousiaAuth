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
        if(experience.length === 0) {
            return { yr: 0, mo: 0}
        }
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
        const {project, skillSet, candidate, education, experience } = this.props
        const {yr, mo} = this.calculateExperience(this.props.experience ? this.props.experience : [])
        return <ATS projectLen={project ? project.length : 0} skills={skillSet && skillSet.coreSkills? this.props.skillSet.coreSkills.length : 0} experienceYears={yr} experienceMonths={mo} />
    }

    render() {
        if(this.props.auth && this.props.candidate && this.props.skillSet) {
            const {project, skillSet, candidate, education, experience } = this.props
            console.log(project);
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
                        <FormBar skillList={skillSet && skillSet.coreSkills ? skillSet.coreSkills : []} />
                        {project && project.length ? project.map((value,index) => <Project key={index} idx={index} data={value} isEmpty={false} /> ) : 
                         <Project data={null} isEmpty={true} />    
                        }
                    </div>
                    <div className='dashboardStack'>
                        <div>
                            <SkillPieChart data={skillSet && skillSet.coreSkills ? skillSet.coreSkills : []} />
                            <CompentencyPieChart />
                            {skillSet && skillSet.coreSkills ? <Certificate data={skillSet.coreSkills} isEmpty={false} /> : 
                            <Certificate data={skillSet && skillSet.coreSkills ? skillSet.coreSkills : []} isEmpty={true} />
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

function mapStateToProps({auth, candidate, education, experience, project, skillSet}) {
    return { auth, candidate, education, experience, project, skillSet }
}

export default connect(mapStateToProps)(Dashboard);