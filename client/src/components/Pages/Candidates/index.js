import React, { Component } from 'react';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

import PostedJobCard from './components/postedJobCard';
import CandidateCard from './components/candidateCard';

import { postedJob } from '../../../data/postedJobData';
import { candidateData } from '../../../data/candidateData';
import './styles.css';

class Candidates extends Component {
    constructor(props){
        super(props);
        this.state = {candidateList: []}
    }
    renderCandidateList(index) {
        if(index == 0 || index == 2) {
            var temp=[]
            for(var i=0;i<3;i++) {
                temp.push(candidateData[i]);
            }
            this.setState({candidateList: temp})
        }
        else {
            var temp=[]
            for(var i=3;i<5;i++) {
                temp.push(candidateData[i]);
            }
            this.setState({candidateList: temp})
        }
    }

    componentDidMount() {
        var temp=[]
        for(var i=0;i<3;i++) {
            temp.push(candidateData[i]);
        }
        this.setState({candidateList: temp})
    }

    renderItem(obj) {
        return (
            <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
                <PostedJobCard logo={obj.url} companyName={obj.name} slryRnge={obj.slryRnge} position={obj.position} skills={obj.skills} exp="2.3 yrs" />
            </div>
        )
    }
    render() {
        return (
            <div style={{'margin': '1rem'}}>
                <Divider textAlign="left">
                    <Chip label="Jobs Posted" />
                </Divider>
                <div style={{display: 'block'}}>
                    <div className='postedJobContainer'>
                        <Carousel
                            autoPlay={false}
                            animation='slide'
                            navButtonsAlwaysVisible={true}
                            onChange={(now,prev) => this.renderCandidateList(now)}
                        >
                            {postedJob.map(obj => this.renderItem(obj))}
                        </Carousel>
                    </div>
                </div>
                <Divider textAlign="left">
                    <Chip label="Shortlisted Candidates" />
                </Divider>
                <div className='suggestedCandidateContainer'>
                    {this.state.candidateList.map(obj => <CandidateCard logo={obj.imageURL} company={obj.company} name={obj.name} comp={obj.comp} position={obj.designation} skills={obj.skill} exp={obj.exp} />)}
                </div>
            </div>
        )
    }
}

export default Candidates;