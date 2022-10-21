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

class SkillPieChart extends Component {
    render() {
        var skillData = [];
        const skillSet = this.props.data;
        console.log('skillSet ', skillSet);
        skillSet.map((skill,index) => {
            const colorVal = Math.floor(Math.random() * 300) + 50;
            let val = 0.7*(skill.industryExperience.yr*12 + skill.industryExperience.mon);
            val = val + 0.3*(skill.otherExperience.yr*12 + skill.otherExperience.mon)
            var obj = {
                "id": skill.skillName,
                "label": skill.skillName,
                "value": Math.ceil(val),
                "color":  "hsl("+colorVal+" 70%, 50%)"
            }
            skillData.push(obj); 
        })
        return (
            <div className='skillpiechartContainer shadow' >
                <h5 style={{'textAlign': 'center', 'color': '#1072EB'}}>Skill Pie Chart</h5>
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
                                id: 'java'
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
                                id: 'scala'
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

export default SkillPieChart;