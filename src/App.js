import React, { Component } from 'react';
import gaussian from 'gaussian'
import _ from 'lodash'
import moment from 'moment'
import 'whatwg-fetch'

import ChartWrapper from './ChartWrapper';
import body from './data'

export class App extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      loading: true,
      currentDate: new Date(),
      period: 'week'
    }
  }

  componentWillMount() {
    const accountId = this.props.location.query['account-id']
    const transactionId = this.props.location.query['transaction-id']
    fetch('http://mondo.instatswetrust.com/v1/transactions/detailed?account-id=' +
      accountId + '&transaction-id=' + transactionId)
    .then(response => response.json()
      , ::console.error)
    .then(body => {
      let processStats = stats => _.sortBy(stats.expenses.map(({ key, stats }) => {
        return {
          timestamp: key / 1000,
          amount: Math.abs(stats.sum)
        }
      }), 'timestamp')

      // let data = body.map(({created, amount}) => ({
      //   date: moment(created).startOf('day').unix(),
      //   amount: amount
      // }))

      // data = _.groupBy(data, 'date')
      this.setState({
        periodData: {
          week: processStats(body.aggs.week),
          month: processStats(body.aggs.month),
          year: processStats(body.aggs.year)
        },
        loading: false
      })
    });
  }

  changePeriod(period) {
    this.setState({
      period: period
    })
  }

  render() {
    let { periodData, currentDate, period } = this.state
    if (this.state.loading) {
      return <span>Loading...</span>
    }

    let data = periodData[period]
    // data = _.map(data, (entries, timestamp) => ({
    //   timestamp,
    //   amount: _.reduce(entries, (acc, { amount }) => amount > 0 ? acc : acc - amount, 0)
    // }))

    // data = data.filter((value, key))
    // let beginningOfMonth = moment(currentDate).startOf('month').unix()
    // let endOfMonth = moment(currentDate).endOf('month').unix()
    // data = data.filter(({amount, timestamp}) => (
    //   timestamp >= beginningOfMonth && timestamp <= endOfMonth
    // ))

    let weekAmount = _.sum(periodData.week, 'amount')
    let monthAmount = _.sum(periodData.month, 'amount')
    let yearAmount = _.sum(periodData.year, 'amount')

    let accumulatedData = []
    let previous = { y: 0 }
    _.each(data, ({amount, timestamp}) => {
      let newEntry = {
        x: Number(timestamp),
        y: previous.y + amount
      }
      accumulatedData.push(newEntry)
      previous = newEntry
    })

    return (
      <div>
        <div>
          <ChartWrapper
            currentDate={currentDate}
            period={period}
            onPeriodChange={::this.changePeriod}
            data={data}
            weekAmount={weekAmount}
            monthAmount={monthAmount}
            yearAmount={yearAmount}
            accumulatedData={accumulatedData}
          />
        </div>
      </div>
    );
  }
}