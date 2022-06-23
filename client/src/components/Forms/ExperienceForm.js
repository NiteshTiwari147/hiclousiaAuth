import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select';

class ExperienceForm extends Component {
    constructor(props) {
        super(props);
        this.state ={error: [],organization: '', position: '',desc: '', start_year: '',skill: '',skills: [], end_year: '', current: true, Industryselectoptions: [], ID:"", Industryname:""}
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
    async getOptions(){
        const IndustryData = [
            {
                ID: 0,
                Industryname: 'Backend'
            },
            {
                ID: 1,
                Industryname: "Frontend"
            },
            {
                ID: 2,
                Industryname: "Data Science"
            },
            {
                ID: 3,
                Industryname: "Quality/Testing"
            }
        ];

        const Industryoptions = IndustryData.map(d => ({
          "value" : d.ID,
          "label" : d.Industryname
    
        }))
           this.setState({Industryselectoptions: Industryoptions})
      }


    IndustryhandleChange(e){
        this.setState({ID:e.value, Industryname:e.label})
       } 
    componentDidMount(){
           this.getOptions()
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
                                <Datepicker selected={this.state.start_year} onChange={(date) => this.setState({ start_year: date})} 
                                  dateFormat='dd/MM/yyyy' isClearable showYearDropdown scrollableYearDropdown placeholderText="DD/MM/YYYY"
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
                            <div>
                                <Select options={this.state.Industryselectoptions} onChange={this.IndustryhandleChange.bind(this)} />    
                            </div>
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