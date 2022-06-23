import React, { Component } from "react";
import { Link } from 'react-router-dom'

import './styles.css';

class FormBar extends Component {
    render() {
        return(
            <div className="pageBarContainer shadow">
                <Link to="/experienceForm" className='pageBarBtn'>
                    Add Education
                </Link>
                <Link  to="/educationForm" className='pageBarBtn'>
                   Add Experience
                </Link>
                <Link to="/projectForm" className='pageBarBtn highlight'>
                    Add Projects
                </Link>
            </div>
        )
    }
}

export default FormBar;