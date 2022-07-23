import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import reduxThunk from 'redux-thunk';


import App from './components/App';
import reducers  from './reducers';

const store = configureStore({
    reducer: reducers,
    middleware: [reduxThunk]
});

ReactDOM.render( 
<Provider store={store}><App /></Provider>, 
document.querySelector('#root'));