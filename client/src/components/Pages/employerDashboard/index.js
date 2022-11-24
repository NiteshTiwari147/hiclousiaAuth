import React, { Component } from "react";
import Carousel from 'react-material-ui-carousel';
import { connect } from 'react-redux';

import PostedJobCard from "../Candidates/components/postedJobCard";
import AddJobBar from "./component/addJob";
import EmployerATS from "./component/ATS";
import EmployerInfo from "./component/employerInfo";
import JobView from "./component/jobView";
import LoadingScreen from '../../utils/loadingScreen';

import './style.css';

class EmployerDashboard extends Component {
    render() {
        const { hr, jobs } = this.props;
        if(hr && jobs) {
            return <div className='dashboardLayout'>
                <div className='dashboardStack'>
                    <EmployerInfo data={hr}/>
                </div>
                <div className='dashboardStack'>
                    <EmployerATS data={jobs}/>
                    <AddJobBar />
                    {jobs.length > 0 && <div className='postedJobCarousel'>
                        <Carousel
                            autoPlay={false}
                            animation='slide'
                            navButtonsAlwaysVisible={true}
                            onChange={(now,prev) => console.log(now)}
                        > 
                            {jobs.map(job => <PostedJobCard data={job} />)}
                        </Carousel>
                    </div>}         
                </div>
                <div className='dashboardStack'>
                    <JobView />
                </div>
            </div>
        } else {
            return <LoadingScreen />
        }
        
    }
}

function mapStateToProps({auth, hr, jobs}) {
    return { auth, hr, jobs }
}

export default connect(mapStateToProps)(EmployerDashboard);