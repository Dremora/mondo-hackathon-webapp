import React, { Component } from 'react'
import { VictoryChart, VictoryLine, VictoryAxis } from "victory"
import _ from 'lodash'
import Immutable from 'immutable'
import gaussian from 'gaussian'


const maxToSpend = 500
const days = 30
const distribution = gaussian(maxToSpend / days, 50)

const ideal = [
  {x: 1, y: 0},
  {x: 30, y: maxToSpend}
]

const spentPerDay = _.range(1, days + 1).map(day => {
  return Math.ceil(distribution.ppf(Math.random()))
})

const transactionData = _.foldl(spentPerDay, (acc, day) => {
  if (acc.size === 0) {
    return Immutable.List.of(day);
  } else {
    return acc.push(acc.get(acc.size - 1) + day)
  }
}, Immutable.List.of())
.toArray()
.map((val, index) => ({ x: index + 1, y: val }))


export default class Chart extends Component {
  render() {
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