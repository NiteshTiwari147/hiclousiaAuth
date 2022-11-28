import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from  '@mui/material/Button';
import Modal from '@mui/material/Modal';

import EducationModal from '../../../../Forms/educationModal';
import * as actions from '../../../../../actions';

import './styles.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    height: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid white',
    borderRadius: '15px',
    boxShadow: '2px 2px #1072EB',
    p: 4,
  };

class EducationListingModal extends Component {

    constructor(props) {
        super(props);
        this.state = { modalOpen: false, prevData:{} }
    };

    handleDelete(educationID) {
        this.props.deleteEducation({
            value: {
                id: educationID
            }
        })
        .then(() => this.props.fetchEducation())
    }

    handleModalOpen(item) {
        this.setState({ prevData: {
            id: item._id,
            institute: item.institute,
            course: item.course,
            field_of_course: item.field_of_course,
            start_year: Date.parse(item.start_date),
            end_year:  Date.parse(item.end_date),
            grade: item.grade,
            industry: ''
        }
        })
        this.setState({modalOpen: true})
    }

    handleModalClose() {
        this.setState({modalOpen: false});
        this.props.close();
    }

    renderItem(item) {
        return <tr className='modalListItem'>
            <td>
                <h6>{item.institute}</h6>
            </td>
            <td>
                <Button 
                color='success' 
                variant='contained' 
                onClick={this.handleModalOpen.bind(this,item)}
                sx={{marginRight: '0.5rem'}}>
                    Edit
                </Button>
                <Button color='error' variant='contained' onClick={this.handleDelete.bind(this,item._id)}>Delete</Button>
            </td>
        </tr>
    }

    render() {
        const list = this.props.list;
        return (
            <div>
                <Modal
                    open={this.props.open}
                    onClose={this.props.close}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h4 style={{"color": "#1072EB"}}>Education List</h4>
                        <Divider color='skyblue'/>
                        <table style={{'width': '30rem'}}>
                            {list.map(item => this.renderItem(item))}
                        </table>
                    </Box>
                    </Modal>
                    {this.state.modalOpen && <EducationModal 
                    open={this.state.modalOpen}
                    close={this.handleModalClose.bind(this)} 
                    data={this.state.prevData}
                    edit={true}
                    />}
            </div>
        )
    }
    
}

export default connect(null, actions)(EducationListingModal);