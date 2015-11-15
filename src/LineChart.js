import React, { Component } from 'react'
import { VictoryChart, VictoryLine, VictoryAxis } from "victory"
import _ from 'lodash'
import moment from 'moment'

export default ({ data, period }) => {
  const start = data[0].x
  const end = data[data.length - 1].x

  let tickFormat
  let maxToSpend

  switch (period) {
    case 'week':
      tickFormat = 'ddd'
      maxToSpend = 1000
      break
    case 'month':
      tickFormat = 'D'
      maxToSpend = 4000
      break
    case 'year':
      tickFormat = 'MMM'
      maxToSpend = 52000
  }

  const ideal = [
    {x: start, y: 0},
    {x: end, y: maxToSpend}
  ]

  return (
    <VictoryChart>
      <VictoryAxis
        independentAxis={true}
        tickFormat={x => moment.unix(x).format(tickFormat)}
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