import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import EducationModal from "./educationModal";
import ExperienceModal from "./experienceModal";
import ExperienceTable from './subcomponent/ExperienceTable';
import EducationTable from './subcomponent/EducationTable';
import SkillForm from './SkillForm';

class CompositeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOneSubmitted: false,
            formTwoSubmitted: false,
            educationModalOpen: false,
            experienceModalOpen: false,
        }
    }

    handleExperienceModalOpen() {
        this.setState({experienceModalOpen: true})
    }
    handleExperienceModalClose() {
        this.setState({experienceModalOpen: false})
    }

    handleEducationModalOpen() {
        this.setState({educationModalOpen: true})
    }
    handleEducationModalClose() {
        this.setState({educationModalOpen: false})
    }
    handleFormOneSubmit() {
        this.setState({formOneSubmitted: true})
    }

    render() {
        if(this.props) {
            const {experience, education } = this.props;
            return(
                <div>
                    {!this.state.formOneSubmitted && !this.state.formTwoSubmitted && <div>
                        <h5  style={{textAlign: 'center', color: '#1272EB', fontFamily: 'sans-serif', marginBottom: '1rem'}}>Please add your education and experience</h5>
                        <div className='updateForm container'>
                            <div className='onBoardingFormCardContainer shadow'>
                                <Button size='small' onClick={this.handleEducationModalOpen.bind(this)}>
                                    <div style={{fontSize: 'small', fontWeight: 'bold'}}>Add Education</div>
                                </Button>
                                <EducationModal open={this.state.educationModalOpen} close={this.handleEducationModalClose.bind(this)} />
                            </div>
                            <div className='onBoardingFormCardContainer shadow'>
                                <Button size='small' onClick={this.handleExperienceModalOpen.bind(this)}>
                                    <div style={{fontSize: 'small', fontWeight: 'bold'}}>Add Experience</div>
                                </Button>
                                <ExperienceModal open={this.state.experienceModalOpen} close={this.handleExperienceModalClose.bind(this)} />
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <div style={{display: 'flex'}}>
                                <div className='experienceTable'>
                                    <h6 style={{fontWeight: 800}}>Experience Table</h6>
                                    <ExperienceTable data={experience}/>
                                </div>
                                <Divider orientation="vertical" flexItem />
                                <div className='educationTable'>
                                    <h6 style={{fontWeight: 800}}>Education Table</h6>
                                    <EducationTable data={education}/>
                                </div>                  
                            </div>
                        </div>
                        <div style={{'display': 'flex', 'justifyContent': 'center', 'margin': '2rem'}}>
                            <Button size='large' variant='contained' onClick={this.handleFormOneSubmit.bind(this)}>
                                Save
                            </Button>
                        </div>
                    </div>}
                    {this.state.formOneSubmitted && !this.state.formTwoSubmitted && <SkillForm />}
                </div>
            ) 
        }
        
    }
}

function mapStateToProps({education, experience}) {
    return { education, experience}
}

export default connect(mapStateToProps)(CompositeForm);