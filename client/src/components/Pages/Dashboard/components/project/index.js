import React, { Component } from 'react';

import ProjectDetail from './sub-component/projectDetailModal';

import { projectImages } from '../../../../../data/projectImages';
import './styles.css';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectDetailModalOpen : false
        }
    }

    handleProjectDetailModalOpen() {
        this.setState({projectDetailModalOpen: true})
    }

    handleProjectDetailModalClose() {
        this.setState({projectDetailModalOpen: false})
    }

    renderSkills(skills) {
        if(skills.length > 0) {
            return skills.map((obj,index) => {
                if(index < 3) {
                    return <div className='skillBox shadow'>{obj}</div>
                }
                if( index == 3) {
                    return <div className='skillBox shadow'>+ {skills.length - 3} More</div>
                }
            })
        }
    }
    render(){
        const isEmpty = this.props.isEmpty
        if(isEmpty) {
            return <div className='projectContainer shadow' style={{flexDirection: 'column' ,justifyContent: 'center',
                alignItems: 'center'}}>
                <h4>You have not added any project</h4>
                <p>Adding your work is the best way to showcase your skills</p>
            </div>
        }

        const { title, skills, typeOfProject, industry, department } = this.props.data;
        const idx = this.props.idx % 10;
        return(
            <div className='projectContainer shadow'>
                <img className='projectImage' src={projectImages[idx].url} />
                <div className='projectInfoContainer'>
                    <div className='projectTitle'>{title}</div>
                    { skills && <div style={{'fontSize': 'medium'}}>
                        Skills: {skills.length}
                    </div>}
                    <div className='skillsContainer' style={{'marginBottom': '1rem'}}>
                        {this.renderSkills(skills)}
                    </div>
                </div>
                <div className='projectStatContainer'>
                    <div className='projectStat'>
                        <div style={{ marginLeft: '1rem'}}>
                            <div className="projectStatTitle">
                                Type
                            </div>
                            <div>
                                <h8 style={{color: '#1072EB', margin: '0.1rem'}}>{typeOfProject}</h8>
                            </div>
                            </div>
                    </div>
                    <div className='projectStat'>
                        <div style={{ marginLeft: '1rem'}}>
                            <div className="projectStatTitle">
                                Category
                            </div>
                            <div>
                                <h8 style={{color: '#1072EB', margin: '0.1rem'}}>{industry}</h8>
                            </div>
                        </div>
                    </div>
                    <div className='projectStat'>
                        <div style={{ marginLeft: '1rem'}}>
                            <div className="projectStatTitle">
                                Role
                            </div>
                            <div>
                                <h8 style={{color: '#1072EB', margin: '0.1rem'}}>{department}</h8>
                            </div>
                            </div>
                    </div>
                    <button className="projectDetailsBtn" onClick={this.handleProjectDetailModalOpen.bind(this)}>
                        View Details 
                    </button>
                    <ProjectDetail 
                        data={this.props.data}
                        img={projectImages[idx].url}
                        open={this.state.projectDetailModalOpen}
                        close={this.handleProjectDetailModalClose.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default Project;