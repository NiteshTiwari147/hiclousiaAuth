import React, { Component } from "react";

import './style.css';

class JobView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {jobs} = this.props;
        return <div className="jobViewContainer shadow">
            <div><h5>Total Job Posted</h5></div>
            <div><h2>{jobs}</h2></div>
        </div>
    }
}

export default JobView;