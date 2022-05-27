import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Landing from '../Landing';

class GateWay extends Component {
    componentDidMount() {
        this.props.fetchCandidate();
    }
    render() {
        return (
            <Landing />
        )
    }
};

export default connect(null, actions)(GateWay);