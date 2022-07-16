import React, { Component } from "react";

import './styles.css';

class StatBox extends Component {
    render() {
        const {title,value} = this.props;
        return (
            <div className="statBox">
                <div className="statBoxText">
                    {title}
                </div>
                <div className="statBoxScore">                            
                <h7 style={{marginTop: '0.5rem'}}>{value}</h7>
                </div>
            </div>
        )
    }
}

export default StatBox;