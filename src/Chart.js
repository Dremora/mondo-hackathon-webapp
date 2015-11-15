import React, { Component } from 'react'
import { VictoryChart, VictoryLine, VictoryAxis } from "victory"
import _ from 'lodash'
import moment from 'moment'

export default class Chart extends Component {
  render() {
    const { maxToSpend, data } = this.props
    const days = data.length
    const ideal = [
      {x: 1, y: 0},
      {x: days, y: maxToSpend}
    ]

    return (
      <VictoryChart>
        <VictoryAxis
          independentAxis={true}
        />
        <VictoryAxis
          tickFormat={x => `£${x / 100}`}
          dependentAxis={true}
        />

        <VictoryLine
          style={{data:
            {stroke: "red", strokeWidth: 2}
          }}
          interpolation="basis"
          data={data}
        />


        <VictoryLine
          style={{data:
            {stroke: "green", strokeWidth: 2}
          }}
          interpolation="basis"
          data={ideal}
        />
      </VictoryChart>
    )
  }
}