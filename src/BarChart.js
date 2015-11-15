import React, { Component } from 'react'
import { VictoryChart, VictoryBar, VictoryAxis } from "victory"
import _ from 'lodash'
import moment from 'moment'

export default ({ data, period }) => {
  console.log(data)
  const chartData = data.map(({ amount, timestamp}) => ({
    x: Number(timestamp),
    y: amount
  }))


  let tickFormat
  let tickValues = []
  let tickLabelSize

  let start = moment().startOf(period)
  let end = moment().endOf(period).startOf('day').add('day', 1)

  let periodDiff
  switch (period) {
    case 'week':
      periodDiff = 'day'
      tickFormat = 'ddd'
      tickLabelSize = 10
      break
    case 'month':
      periodDiff = 'day'
      tickFormat = 'D'
      tickLabelSize = 6
      break
    case 'year':
      periodDiff = 'week'
      tickFormat = 'w'
      tickLabelSize = 5
      break
  }

  while (start.isBefore(end)) {
    tickValues.push(start.unix())
    start.add(1, periodDiff)
  }

  console.log(data)

  return (
    <VictoryChart>
      <VictoryAxis
        tickFormat={x => `£${x / 100}`}
        dependentAxis={true}
        animate={{velocity: 0.1}}
      />
      <VictoryAxis
        animate={{velocity: 0.1}}
        tickFormat={x => moment.unix(x).format(tickFormat)}
        tickValues={tickValues}
        independentAxis={true}
        style={{
          tickLabels: {
            fontSize: tickLabelSize
          }
        }}
      />
      <VictoryBar
        animate={{velocity: 0.1}}
        data={chartData}
      />
    </VictoryChart>
  )
}