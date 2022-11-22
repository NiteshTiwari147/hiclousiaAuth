import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import FilterPane from './components/filterPane';
import JobCard from './components/jobCard';
import LoadingScreen from '../../utils/loadingScreen';

import { companyData } from '../../../data/companyData';
import './styles.css';

class Jobs extends Component {

    componentDidMount() {
        this.props.fetchCandidate()
        .then(res => {
            const {
                expectedIndustry,
                expectedDepartment
            } = this.props.candidate;
            this.props.fetchSkillSet()
            this.props.fetchRelevantJobs({
                value: {
                    industry: expectedIndustry,
                    department: expectedDepartment
                }
            });
        });
       
    }

    render() {
        if(this.props.candidate && this.props.relevantJobs && this.props.skillSet) {
            const { expectedIndustry, expectedDepartment, experienceYears, experienceMonths, city, expectedSalary} = this.props.candidate
            const relevantJobsData = this.props.relevantJobs;
            const { processedSKillList } = this.props.skillSet;
        return (
            <div className='jobsContainer'>
                <label className='filterPaneTitle'>
                    Expectations : 
                </label>
                <FilterPane 
                industry={expectedIndustry}
                department={expectedDepartment}
                expectedSalary={expectedSalary}
                cities={city}
                 />
                <label className='filterPaneTitle'>
                    Relevant Oppurtunities : 
                </label>
                <div className='jobResultContainer'>
                    {relevantJobsData.map(obj => <JobCard exp={obj.experience} companyName={obj.companyName} budget={obj.budget} skills={obj.skills} skillPos={processedSKillList}/>)}    
                </div>
            </div>
        )
        }
        else {
            <LoadingScreen />
        }
    }
}

function mapStateToProps({candidate, relevantJobs, skillSet}) {
    return { candidate, relevantJobs, skillSet }
}

export default connect(mapStateToProps, actions)(Jobs);