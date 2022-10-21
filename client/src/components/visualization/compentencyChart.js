import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie';
import Divider from '@mui/material/Divider';

import './styles.css';

const data = [
    {
      "id": "php",
      "label": "php",
      "value": 576,
      "color": "hsl(329, 70%, 50%)"
    },
    {
      "id": "stylus",
      "label": "stylus",
      "value": 309,
      "color": "hsl(284, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 64,
      "color": "hsl(177, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 131,
      "color": "hsl(40, 70%, 50%)"
    },
    {
      "id": "lisp",
      "label": "lisp",
      "value": 465,
      "color": "hsl(111, 70%, 50%)"
    }
  ]

class CompentencyPieChart extends Component {
    render() {
        var skillData = [];
        let colorVal = Math.floor(Math.random() * 300) + 50;
        var educationComptency = {
            "id": 'Education Compentency',
            "label": 'Education Compentency',
            "value": 73,
            "color":  "hsl("+colorVal+" 70%, 50%)"
        }
        colorVal = Math.floor(Math.random() * 300) + 50;
        var skillComptency = {
            "id": 'Skill Compentency',
            "label": 'Skill Compentency',
            "value": 87,
            "color":  "hsl("+colorVal+" 70%, 50%)"
        }
        skillData.push(educationComptency);
        skillData.push(skillComptency);      
        return (
            <div className='skillpiechartContainer shadow' >
                <h5 style={{'textAlign': 'center', 'color': '#1072EB'}}>Compentency Pie Chart</h5>
                <Divider color='skyblue'/>
                <ResponsivePie
                    data={skillData}
                    margin={{top: 20,right: 30, bottom: 80, left: 30 }}
                    innerRadius={0.45}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'Skill Compentency'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'c'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'go'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'python'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'Education Compentency'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'lisp'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'elixir'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'javascript'
                            },
                            id: 'lines'
                        }
                    ]}
                />
            </div>
        )
    }
};

export default CompentencyPieChart;