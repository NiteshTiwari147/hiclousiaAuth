import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select';
import * as actions from '../../actions';

class ProjectForm extends Component {
    constructor(props) {
        super(props);

        this.state = { errors: [], tittle: '', desc: '', solution: '', start_year: '',skill: '',skills: [], end_year: '', Industryselectoptions: [], ID:"", Industryname:""}
    }

    submitProject() {
        this.props.sendProjectInfo({          
            value: {
                company: this.state.tittle,
                desc: this.state.desc,
                startDate: this.state.start_year,
                endDate: this.state.end_year,
                skills: this.state.skills,
                industry: this.state.industry
            }      
        });
    }

    addProject() {
        this.props.sendProjectInfo({          
            value: {
                company: this.state.tittle,
                desc: this.state.desc,
                startDate: this.state.start_year,
                endDate: this.state.end_year,
                skills: this.state.skills,
            }      
        })
        .then(res => window.location.reload())
    }

    addCoreSkill(event) {
        event.preventDefault();
        const skill = this.state.skill;
        const coreSkills = this.state.skills;
        coreSkills.push(skill);
        this.setState({skill: ''})
        this.setState({skills: coreSkills});

    }
    
    async getOptions(){
        const IndustryData = [
            {
                ID: 0,
                Industryname: 'IT'
            },
            {
                ID: 1,
                Industryname: "Mechanical"
            },
            {
                ID: 2,
                Industryname: "Chemical"
            },
            {
                ID: 3,
                Industryname: "Biology"
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
                <h3>Add Project data</h3>
            </div>
            <div className="row">
                <form className="col s16 formContent">
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Title
                        </div>
                        <div className='formInput'>
                            <input 
                                placeholder="Enter project title"
                                value={this.state.tittle}
                                onChange={ e => this.setState({ tittle: e.target.value })}
                            />    
                        </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            Description
                        </div>
                        <div className='formInput'>
                            <input
                                placeholder="Enter problem statement of the project"
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
                                placeholder="Add core Skill "
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
                                Start date
                            </div>
                            <div className='formInput'>
                                <Datepicker selected={this.state.start_year} onChange={(date) => this.setState({ start_year: date})} 
                                  dateFormat='dd/MM/yyyy' isClearable showYearDropdown scrollableYearDropdown placeholderText="DD/MM/YYYY"
                                />
                            </div>                    
                    </div>
                    <div className="form_inputBox input-field">
                        <div className='formLabel_title'>
                            End date
                        </div>
                        <div className='formInput'>
                            <Datepicker selected={this.state.end_year} onChange={(date) => this.setState({ end_year: date})} 
                                  dateFormat='dd/MM/yyyy' isClearable showYearDropdown scrollableYearDropdown placeholderText="DD/MM/YYYY"
                            />    
                        </div>                    
                    </div>
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
                        <button className="btn" onClick={this.submitProject.bind(this)}><a href='/surveys' className='linkBtn'> Submit And Go
                    </a></button>
                        <button className="btn" onClick={this.addProject.bind(this)}>Add New Project</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
};

export default connect(null, actions)(ProjectForm);