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
    handleModalOpen() {
        this.setState({modalOpen: true})
    }
    handleModalClose() {
        this.setState({modalOpen: false})
    }
    render() {
        const { logo, companyName, slryRnge, position, skills, origin, exp } = this.props;
        return (
                <div className='postedJobCardContainer shadow'>
                    <div className="postedJobCardHeadingContainer">
                        <div className='sectionOne'>
                            <img className="postedJobCompanyImage"  src={logo} /> 
                        </div>
                        <div className="introductionPostedJob">
                            <h5 style={{marginTop: '2.5rem',marginBottom: '0.2rem'}}>{companyName}</h5>
                            <div style={{fontSize: 'smaller', marginTop: '0.3rem'}}>Posted Date: 12/july</div>
                        </div>
                        <div className='viewDetails'>
                            <Button variant="contained" size='small' onClick={this.handleModalOpen.bind(this)}>
                                <div style={{fontSize: 'smaller'}}>view Job description</div>
                            </Button>
                            <BasicModal open={this.state.modalOpen} close={this.handleModalClose.bind(this)} />
                        </div>
                    </div>
                    <div className="postedJobstateBoxContainer">
                        <StatBox title='Industry' value='IT' />
                        <StatBox title='Department' value='Front End' />
                        <StatBox title='Position' value={position} />
                        <StatBox title='Experience' value={exp} />
                        <StatBox title='Skills' value={skills} />
                        <StatBox title='Location' value='Bangalore' />
                        <StatBox title='Budget' value='4-5 LPA' />
                    </div>
                </div>
        )
    };
};

export default PostedJobCard;