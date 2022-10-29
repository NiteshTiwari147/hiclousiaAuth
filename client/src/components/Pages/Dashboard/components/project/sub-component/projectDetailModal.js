import React, { Component } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.8)',
    width: '70%',
    height: '100%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid white',
    borderRadius: '15px',
    boxShadow: '2px 2px #1072EB',
    p: 4,
    paddingTop: 1
};

class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { title, description, skills, typeOfProject, department, industry } = this.props.data;
        const { img } = this.props;
        return <div>
            <Modal
                open={this.props.open}
                onClose={this.props.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='projectDetailsContainer' >
                        <div className='form_title'>
                            <h5 style={{fontWeight: 1000}}>Project Details</h5>
                        </div>
                        <div className='projectDetailHeader'>
                            <img className='projectDetailImage' src={img} />
                            <div style={{marginLeft: '1rem'}} />
                            <div className='projectDetailSummary'>
                                <h5 style={{fontWeight: 800, color: '#1072EB'}}>{title}</h5>
                                <div style={{marginTop: '1rem'}} />
                                <div style={{display: 'flex'}}>
                                    <p>Category :</p>
                                    <div style={{marginLeft: '1rem'}} />
                                    <div className='skillBox shadow' style={{width: '10rem'}}>{industry}</div>
                                    <div className='skillBox shadow' style={{width: '10rem'}}>{department}</div>
                                </div>
                                <div style={{marginTop: '1rem'}} />
                                <div style={{display: 'flex'}}>
                                    <p>Skills Used :</p>
                                    <div style={{marginLeft: '1rem'}} />
                                    {skills && skills.map( skill => <div className='skillBox shadow'>{skill.toUpperCase()}</div>)}
                                </div>
                                <div style={{marginTop: '1rem'}} />
                                <div style={{display: 'flex'}}>
                                    <p>Duration :</p>
                                    <div style={{marginLeft: '1rem'}} />
                                    <div className='skillBox shadow'>3 Months</div>
                                </div>
                                <div style={{marginTop: '1rem'}} />
                                <div style={{display: 'flex'}}>
                                    <p>Project Type :</p>
                                    <div style={{marginLeft: '1rem'}} />
                                    <div className='skillBox shadow'>{typeOfProject}</div>
                                </div>
                            </div>
                        </div>
                        <div style={{margin: '1rem'}} />
                        <div className='projectDetailDescription'>
                            <h5>Description</h5>
                            <p>{description}</p>
                        </div>
                    </div>
                </Box>

            </Modal>
        </div>
    }
}

export default ProjectDetail;