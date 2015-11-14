import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis } from "victory"

export default class Chart extends Component {
  render() {
    return (
      <VictoryChart>
        <VictoryLine
          style={{data:
            {stroke: "red", strokeWidth: 4}
          }}
          interpolation="basis"
          data={[
            {x: 1, y: 2},
            {x: 2, y: 4},
            {x: 3, y: 20}
          ]}
          tickValues={[1, 2, 3, 4, 5]}
        />
      </VictoryChart>
    );
  }
}