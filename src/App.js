import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';
import { VictoryChart, VictoryLine, VictoryAxis } from "victory"

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <VictoryLine

      />
    );
  }
}

export class App extends Component {
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