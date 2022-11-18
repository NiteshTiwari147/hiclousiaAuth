import React, { Component } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import JobPostingForm from "../../../../Forms/jobPostingForm";

class AddJobBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    handleModalOpen() {
        this.setState({modalOpen: true})
    }
    
    handleModalClose() {
        this.setState({modalOpen: false})
    }

    render() {
        return <div className="pageBarContainer shadow">
        <div style={{fontSize: '20px',color: '#1072EB', fontWeight: 'bold'}}>Posted Jobs :</div>
        <JobPostingForm open={this.state.modalOpen} close={this.handleModalClose.bind(this)} />
        <Button  style={{marginBottom: '0.5rem'}} variant="contained" color='success' size='small' onClick={this.handleModalOpen.bind(this)}>
            <AddIcon  />
        </Button>   
    </div>
    }
}

export default AddJobBar;