import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import FlowManager from '../FlowManager';

class GateWay extends Component {

    componentDidMount(){
        
    }

    render() {
        return (
                <FlowManager />
        )
    }
};

export default connect(null, actions)(GateWay);