import React, { Component } from 'react'
import { VictoryChart, VictoryLine, VictoryAxis } from "victory"
import _ from 'lodash'
import moment from 'moment'

export default ({ data, period }) => {
  let tickFormat
  let maxToSpend
  let tickLabelSize
  let tickValues = []

  let start = moment().startOf(period)
  let end = moment().endOf(period).startOf('day').add('day', 1)

  let periodDiff
  switch (period) {
    case 'week':
      periodDiff = 'day'
      tickFormat = 'ddd'
      tickLabelSize = 10
      maxToSpend = 1000
      break
    case 'month':
      periodDiff = 'day'
      tickFormat = 'D'
      tickLabelSize = 6
      maxToSpend = 4000
      break
    case 'year':
      periodDiff = 'week'
      tickFormat = 'w'
      tickLabelSize = 5
      maxToSpend = 52000
      break
  }

  while (start.isBefore(end)) {
    tickValues.push(start.unix())
    start.add(1, periodDiff)
  }

  const ideal = [
    {x: tickValues[0], y: 0},
    {x: tickValues[tickValues.length - 1], y: maxToSpend}
  ]

  return (
    <VictoryChart>
      <VictoryAxis
        independentAxis={true}
        tickFormat={x => moment.unix(x).format(tickFormat)}
        tickValues={tickValues}
        style={{
          tickLabels: {
            fontSize: tickLabelSize
          }
        }}
      />
      <VictoryAxis
        tickFormat={x => `£${x / 100}`}
        dependentAxis={true}
      />

      <VictoryLine
        style={{data:
          {stroke: "red", strokeWidth: 2}
        }}
        interpolation="monotone"
        data={data}
      />


      <VictoryLine
        style={{data:
          {stroke: "green", strokeWidth: 2}
        }}
        interpolation="monotone"
        data={ideal}
      />
    </VictoryChart>
  )
}