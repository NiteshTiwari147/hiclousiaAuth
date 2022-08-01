import React, { Component } from 'react';
import { ResponsiveBullet } from '@nivo/bullet'

const data = [
        {
          "id": "React",
          "ranges": [
            3
          ],
          "measures": [
            3
          ],
          "markers": [
            3
          ]
        },
        {
            "id": "CSS",
            "ranges": [
              5
            ],
            "measures": [
              2
            ],
            "markers": [
              2
            ]
          },
    ]

class TopSkillBar extends Component {
    render() {
        return (
            <div style={{'height': '20rem', 'width': '24rem'}}>
                <ResponsiveBullet
                    data={data}
                    margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
                    spacing={46}
                    titleAlign="start"
                    titleOffsetX={-70}
                    measureSize={0.2}
                />
            </div>
        )
    }
}

export default TopSkillBar;