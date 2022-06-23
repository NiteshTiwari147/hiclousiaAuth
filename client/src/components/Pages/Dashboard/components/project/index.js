import React, { Component } from 'react';

import { projectImages } from '../../../../../data/projectImages';
import './styles.css';

class Project extends Component {

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
            const { title,description, skills } = this.props.data;
            const idx = this.props.idx % 10;
            return(
                <div className='projectContainer shadow'>
                    <img className='projectImage' src={projectImages[idx].url} />
                    <div className='projectInfoContainer'>
                        <div className='projectTitle'>{title}</div>
                        {description && <div style={{'fontSize': 'medium'}}>
                            Description : {description}
                        </div>}
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
                                    Duration
                                </div>
                                <div>
                                    <h8 style={{color: '#1072EB', margin: '0.1rem'}}>2 months</h8>
                                </div>
                             </div>
                        </div>
                        <div className='projectStat'>
                            <div style={{ marginLeft: '1rem'}}>
                                <div className="projectStatTitle">
                                    Company
                                </div>
                                <div>
                                    <h8 style={{color: '#1072EB', margin: '0.1rem'}}>N.A.</h8>
                                </div>
                             </div>
                        </div>
                        <div className='projectStat'>
                            <div style={{ marginLeft: '1rem'}}>
                                <div className="projectStatTitle">
                                    Play Video
                                </div>
                                <div>
                                    <h8 style={{color: '#1072EB', margin: '0.1rem'}}>2:05 mins</h8>
                                </div>
                             </div>
                        </div>
                        <button className="projectDetailsBtn">
                            View Details 
                        </button>
                    </div>
                </div>
            )
        }
}

export default Project;