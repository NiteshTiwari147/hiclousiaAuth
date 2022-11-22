import React, { Component } from 'react';
import { connect } from 'react-redux';

import CandidateInfo from '../Dashboard/components/candidateInfo';
import ATS from '../Dashboard/components/ATS';
import FormBar from '../Dashboard/components/formBar';
import Project from '../Dashboard/components/project';
import SkillPieChart from '../../visualization/skillPieChart';
import Education from '../Dashboard/components/education';
import ExperienceTab from '../Dashboard/components/experience';
import Certificate from '../Dashboard/components/certificates';
import LoadingScreen from '../../utils/loadingScreen';
import CompentencyPieChart from '../../visualization/compentencyChart';

import * as actions from '../../../actions';


class TalentView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        console.log(params.get('id'))
        this.props.fetchTalentDetail({
            value: {
                id: params.get('id')
            }
        });
    }

    renderCandidateInfo(candidate, experience) {
        if(candidate) {
            return <CandidateInfo name={candidate.name} email={candidate.email} currentEmploymnt={experience} />
        }
    }

    calculateExperience() {
        return {yr: 3, mo: 1};
    }

    renderATS(project, skillSet) {
        if(this.props.talentDetail) {
            const {yr, mo} = this.calculateExperience()
            return <ATS projectLen={project ? project.length : 0} skills={skillSet && skillSet.coreSkills? skillSet.coreSkills.length : 0} experienceYears={yr} experienceMonths={mo} />
        }
        
    }

    render() {
        console.log(this.props.talentDetail);
        if(this.props.talentDetail) {
            const {project, skillSet, basicInfo, education, experience } = this.props.talentDetail;
            console.log(project, skillSet, basicInfo, education, experience);
            return (
                <div className='dashboardLayout'>
                    <div className='dashboardStack'>
                        {this.renderCandidateInfo(basicInfo, experience)}
                        {experience && experience.length > 0 ? <ExperienceTab data={experience} isEmpty={false} /> : 
                        <ExperienceTab data={experience} isEmpty={true} />}
                        {education && education.length > 0 ? <Education data={education} isEmpty={false} /> : 
                        <Education data={education} isEmpty={true} />}
                    </div>
                    <div className='dashboardStack'>
                        {this.renderATS(project, skillSet)}
                        {project && project.length ? project.map((value,index) => <Project key={index} idx={index} data={value} isEmpty={false} /> ) : 
                         <Project data={null} isEmpty={true} />    
                        }
                    </div>
                    <div className='dashboardStack'>
                        <div>
                            <SkillPieChart data={skillSet && skillSet.processedSKillList ? skillSet.processedSKillList : []} />
                            <CompentencyPieChart />
                            {skillSet && skillSet.processedSKillList ? <Certificate data={skillSet.processedSKillList} isEmpty={false} /> : 
                            <Certificate data={skillSet && skillSet.processedSKillList ? skillSet.processedSKillList : []} isEmpty={true} />
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            return <LoadingScreen />
        }
    }
}

function mapStateToProps({postedJobDetail, talentDetail}) {
    return {postedJobDetail, talentDetail }
}

export default connect(mapStateToProps, actions)(TalentView);