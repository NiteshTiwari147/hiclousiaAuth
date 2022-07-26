import React, { Component } from 'react';
import { connect } from 'react-redux';

import FilterPane from './components/filterPane';
import JobCard from './components/jobCard';
import LoadingScreen from '../../utils/loadingScreen';

import { companyData } from '../../../data/companyData';
import './styles.css'

class Jobs extends Component {
    render() {
        if(this.props.candidate) {
            const { industry, department, experienceYears, experienceMonths} = this.props.candidate
        return (
            <div className='jobsContainer'>
                <label className='filterPaneTitle'>
                    Fitlers : 
                </label>
                <FilterPane 
                industry={industry}
                department={department}
                experienceYears={experienceYears}
                experienceMonths={experienceMonths}
                 />
                <label className='filterPaneTitle'>
                    Jobs Results : 
                </label>
                <div className='jobResultContainer'>
                    {companyData.map(obj => <JobCard logo={obj.url} companyName={obj.name} slryRnge={obj.slryRnge} position={obj.position} skills={obj.skills} origin='candidate' />)}    
                </div>
            </div>
        )
        }
        else {
            <LoadingScreen />
        }
    }
}

function mapStateToProps({candidate}) {
    return { candidate }
}

export default connect(mapStateToProps)(Jobs);