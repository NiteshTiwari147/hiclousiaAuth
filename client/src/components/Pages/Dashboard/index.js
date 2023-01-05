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

    renderCandidateInfo(candidate, experience) {
        if(candidate) {
            return <CandidateInfo name={candidate.name} email={candidate.email} currentEmploymnt={experience} />
        }
    }

    calculateExperience(experience) {
        return {yr: 3, mo: 1};
    }

    renderATS() {
        const {project, skillSet, candidate, education } = this.props;
        var year=0;
        var month=0;
        if(candidate.experience) {
            year = candidate.experience.year;
            month = candidate.experience.month;
        } 
        return <ATS projectLen={project ? project.length : 0} department={candidate.expectedDepartment} education={education} experienceYears={year} experienceMonths={month} />
    }

    render() {
        if(this.props.auth && this.props.candidate) {
            const {project, skillSet, candidate, education, experience, totalExp } = this.props
            return (
                <div className='dashboardLayout'>
                    <div className='dashboardStack'>
                        {this.renderCandidateInfo(candidate, experience)}
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
                            <SkillPieChart data={skillSet && skillSet.processedSKillList ? skillSet.processedSKillList : []} />
                            <CompentencyPieChart />
                            {/* {skillSet && skillSet.processedSKillList ? <Certificate data={skillSet.processedSKillList} isEmpty={false} /> : 
                            <Certificate data={skillSet && skillSet.processedSKillList ? skillSet.processedSKillList : []} isEmpty={true} />
                            } */}
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

function mapStateToProps({auth, candidate, education, experience, project, skillSet, totalExp}) {
    return { auth, candidate, education, experience, project, skillSet, totalExp }
}

export default connect(mapStateToProps)(Dashboard);