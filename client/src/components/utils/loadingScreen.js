import React, { Component } from 'react';

import loadingLogo from '../../data/loading.svg';

const style = {
    height: '30rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

class LoadingScreen extends Component {
    render() {
        return <div style={style}>
        <img src={loadingLogo} className="App-logo" alt="logo" />
        <h5>Please waiting page is loading</h5>
    </div>
    }
}

export default LoadingScreen;