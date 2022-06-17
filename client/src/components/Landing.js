import React, { Component } from 'react';
import { connect } from 'react-redux';

import UpdateForm from './Forms/UpdateForm';

import './styles.css';

class Landing extends Component {
    
    renderContent() {
        if(this.props.candidate) {
            return <div style={{ textAlign: 'center'}}>
                <h1>
                    Hello, {this.props.candidate.name}
                </h1>
                <h2>Hiclousia helps you in </h2>
                <h3>becoming the best</h3>
                <UpdateForm />
            </div>
        }
        else if (this.props.candidate === null) {
            return <div style={{ textAlign: 'center'}}>
                <h2>Loading....</h2>
                <p>if its longer than 10 seconds,please refresh the page</p>     
            </div>
        }
        
        return <div className='signUp'>
            <div className='signUpTitle'>          
                <h1>Hello !!!</h1>
                <h1>Welcome to Hiclousia, Here we helps you in becoming your best</h1>
            </div>
            <div>
                <a href='/form' className='updateCardContainer shadow fillBox'>
                Fill you basic Information
                </a>
            </div>
        </div>
    }
    render() {
        return(
           <div>
                {this.renderContent()}
           </div>
        )
    }
};

function mapStateToProps({auth,candidate}) {
    return { auth, candidate }
}

export default connect(mapStateToProps)(Landing);