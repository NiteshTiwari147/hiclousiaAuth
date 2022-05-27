import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class ExperienceForm extends Component {
    constructor(props) {
        super(props);
        this.state ={error: [],organization: '', position: '',desc: '', start_year: '',skill: '',skills: [], end_year: '', current: true, industry: ''}
    }

    addCoreSkill(event) {
        event.preventDefault();
        const skill = this.state.skill;
        const coreSkills = this.state.skills;
        coreSkills.push(skill);
        this.setState({skill: ''})
        this.setState({skills: coreSkills});

    }

    submitExperience() {
        this.props.sendExperienceInfo({          
            value: {
                company: this.state.organization,
                designation: this.state.position,
                desc: this.state.desc,
                startDate: this.state.start_year,
                endDate: this.state.end_year,
                skills: this.state.skills,
                industry: this.state.industry
            }      
        });
    }

    addExperience() {
        this.props.sendExperienceInfo({          
            value: {
                company: this.state.organization,
                designation: this.state.position,
                desc: this.state.desc,
                startDate: this.state.start_year,
                endDate: this.state.end_year,
                skills: this.state.skills,
                industry: this.state.industry
            }      
        })
        .then(res => window.location.reload())
    }
    render() {
        return (
            <div className='form_container'>
                <div className='form_title'>
                    <h3>Add Experience data</h3>
                </div>
                <div className="row">
                    <form className="col s16 formContent">
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Organization
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter organization name"
                                    value={this.state.organization}
                                    onChange={ e => this.setState({ organization: e.target.value })}
                                />    
                            </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Designation
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter your designation"
                                    value={this.state.position}
                                    onChange={ e => this.setState({ position: e.target.value })}
                                />    
                            </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Description
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Give a brief about your job"
                                    value={this.state.desc}
                                    onChange={ e => this.setState({ desc: e.target.value })}
                                />    
                            </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                            <div>
                                Skills
                            </div>
                            <div>
                                <input
                                    placeholder="Add Skills used one by one "
                                    value={this.state.skill}
                                    onChange={ e => this.setState({ skill: e.target.value })}
                                />
                                <div className='skill_options'>
                                    <button className="small btn" onClick={this.addCoreSkill.bind(this)}>Add</button>
                                    <div className='addedSkill'>
                                        {this.state.skills && this.state.skills.map( skill => <p style={{'margin-left': '1rem'}}>{skill}</p>)}
                                    </div>        
                                </div>                               
                            </div>
                        </div>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Start Year
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter your designation"
                                    value={this.state.start_year}
                                    onChange={ e => this.setState({ start_year: e.target.value })}
                                />    
                            </div>                    
                        </div>
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Currently Working
                            </div>
                            <div className='formInput'>
                                <button className="small btn" style={{'margin-right': '2rem'}} onClick={(event) => { event.preventDefault(); this.setState({current: true})}}>Yes</button>
                                <button className="small btn" onClick={(event) => { event.preventDefault(); this.setState({current: false})}}>No</button>
                            </div>                    
                        </div>
                        {!this.state.current && 
                            <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                End Year
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter your designation"
                                    value={this.state.end_year}
                                    onChange={ e => this.setState({ end_year: e.target.value })}
                                />    
                            </div>                    
                        </div>
                        }
                        <div className="form_inputBox input-field">
                            <div className='formLabel_title'>
                                Industry
                            </div>
                            <div className='formInput'>
                                <input 
                                    placeholder="Enter Industry"
                                    value={this.state.industry}
                                    onChange={ e => this.setState({ industry: e.target.value })}
                                />    
                            </div>                    
                        </div>
                        <div className='btnOption'>
                            <button className="btn" onClick={this.submitExperience.bind(this)}><a href='/surveys' className='linkBtn'> Submit And Go
                    </a></button>
                            <button className="btn" onClick={this.addExperience.bind(this)}>Add New Experience</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default connect(null, actions)(ExperienceForm);