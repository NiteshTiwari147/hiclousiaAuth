import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Divider from '@mui/material/Divider';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
} from 'chart.js';
  import { Bar } from 'react-chartjs-2';

import './styles.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
    elements: {
        bar: {
            borderRadius: 10
        }
    }
};

const labels = ['Percentile'];

export const data = {
    labels,
    datasets: [
      {
        label: 'Education',
        data: [23],
        backgroundColor: '#5e9e8b',
      },
      {
        label: 'Core Skill',
        data: [45],
        backgroundColor:'#488f31',
      },
      {
        label: 'Soft Skill',
        data: [57],
        backgroundColor:'#9fc08f',
      },
      {
        label: 'Industrial',
        data: [73],
        backgroundColor: '#ec9c9d',
      },
      {
        label: 'Self Growing',
        data: [68],
        backgroundColor:'#de425b',
      },

    ],
  };
class CompentencyPieChart extends Component {
    calculateSkillComp() {
      return [42];
    }

    calculateIndustryComp() {
      return [54];
    }
    render() {
       const { totalExp, skillSet } = this.props;
       if(totalExp && skillSet) {
          const data = {
            labels,
            datasets: [
              {
                label: 'Education',
                data: [23],
                backgroundColor: '#5e9e8b',
              },
              {
                label: 'Core Skill',
                data: this.calculateSkillComp(skillSet),
                backgroundColor:'#488f31',
              },
              {
                label: 'Soft Skill',
                data: [57],
                backgroundColor:'#9fc08f',
              },
              {
                label: 'Industrial',
                data: this.calculateIndustryComp(totalExp),
                backgroundColor: '#ec9c9d',
              },
              {
                label: 'Self Growing',
                data: [68],
                backgroundColor:'#de425b',
              },
        
            ],
          }
          return <div className='skillpiechartContainer shadow'>
              <h5 style={{'textAlign': 'center', 'color': '#1072EB'}}>Compentency Pie Chart</h5>
              <Divider style={{marginBottom: '2rem'}} color='skyblue'/>
              <Bar height={200} options={options} data={data} />
          </div>
       }  
    }
};

function mapStateToProps({auth, totalExp, skillSet}) {
  return { auth, totalExp, skillSet }
}


export default connect(mapStateToProps, actions)(CompentencyPieChart);