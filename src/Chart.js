import React, { Component } from 'react'
import { VictoryChart, VictoryLine, VictoryAxis } from "victory"
import _ from 'lodash'
import Immutable from 'immutable'
import moment from 'moment'

export default class Chart extends Component {
  render() {
    const { maxToSpend, data } = this.props
    const days = data.length
    const ideal = [
      {x: 1, y: 0},
      {x: days, y: maxToSpend}
    ]

    const transactionData = _.foldl(data, (acc, day) => {
      if (acc.size === 0) {
        return Immutable.List.of(day)
      } else {
        return acc.push(acc.get(acc.size - 1) + day)
      }
    }, Immutable.List.of())
    .toArray()
    .map((val, index) => ({ x: index + 1, y: val }))

    return (
      <VictoryChart>
        <VictoryAxis
          independentAxis={true}
          tickValues={[
            days
          ]}
        />
        <VictoryAxis
          dependentAxis={true}
          tickValues={[
            maxToSpend
          ]}
        />

        <VictoryLine
          style={{data:
            {stroke: "red", strokeWidth: 2}
          }}
          interpolation="basis"
          data={transactionData}
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