import React, { Component } from 'react';
import Button from '@mui/material/Button';

import StatBox from '../../../Jobs/components/statBox';
import BasicModal from '../../../../utils/modal';
import './styles.css';


class PostedJobCard extends Component {

    constructor(props){
        super(props);
        this.state = {selectedJob: false, modalOpen: false}
    }

    renderStatBox(title, value) {
        return <div className="statBox" style={{backgroundColor: 'white'}}>
        <div className="statBoxText">
            {title}
        </div>
        <div className="statBoxScore">                            
        <p style={{marginTop: '0.5rem', fontSize: '10px'}}>{value} </p>
        </div>
    </div>
    }

    renderStatListBox(title, values) {
        return <div className="statBox" style={{width: 'fit-content', backgroundColor: 'white'}}>
            <div className="statBoxText">
                {title}
            </div>
            <div className="statBoxScore">                            
            {values.map( value => <p style={{marginTop: '0.5rem', fontSize: '10px'}}>{value} </p>)}
            </div>
        </div>

    }
    handleModalOpen() {
        this.setState({modalOpen: true})
    }
    handleModalClose() {
        this.setState({modalOpen: false})
    }
    render() {
        const {companyName,
            experience,
            description,
            industry,
            department,
            skills,
            cities,
            budget } = this.props.data;
        return (
                <div className='postedJobCardContainer shadow'>
                    <div className="postedJobCardHeadingContainer">
                        <div style={{display: 'flex'}}>
                            <div className='sectionOne' style={{marginRight: '1rem'}}>
                                <label>Company Name</label>
                                <p style={{fontWeight: 500}}>{companyName}</p>
                            </div>
                            <div className='sectionOne' style={{marginRight: '1rem'}}>
                                <label>Posted Date</label>
                                <p style={{fontWeight: 500}}>12 Nov 2022</p>
                            </div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div className='viewDetails'>
                                <Button variant="contained" size='small'>
                                    <div style={{fontSize: '9px'}}>view candidates</div>
                                </Button>
                            </div>
                            <div className='viewDetails'>
                                <Button variant="contained" size='small' onClick={this.handleModalOpen.bind(this)}>
                                    <div style={{fontSize: '9px'}}>view Job details</div>
                                </Button>
                                <BasicModal open={this.state.modalOpen} close={this.handleModalClose.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <div className="postedJobstateBoxContainer">
                        {this.renderStatBox('Industry', industry)}
                        {this.renderStatBox('Budget', `${budget.min}-${budget.max} LPA`)}
                        {this.renderStatBox('Experience', `${experience.min}-${experience.max} yrs`)}
                        {this.renderStatBox('Skills', skills.length)}
                        {this.renderStatListBox('Department', department)}
                        {this.renderStatListBox('Location', cities)}
                    </div>
                </div>
        )
    };
};

export default PostedJobCard;