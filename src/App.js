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
    // fetch('http://2fef1536.ngrok.com/app_dev.php/v1/transactions/balance/day')
    // .then(response => response.json()
    //   , ::console.error)
    // .then(body => {
      let data = body.map(({created, amount}) => ({
        date: moment(created).startOf('day').unix(),
        amount: amount
      }))

      data = _.groupBy(data, 'date')
      this.setState({
        data: data,
        loading: false
      })
    // });
  }

  changePeriod(period) {
    let start = moment().startOf(period).unix()
    let end = moment().endOf(period).unix()
    this.setState({
      period: period
    })
  }

  render() {
    let { data, currentDate, period } = this.state
    data = _.map(data, (entries, timestamp) => ({
      timestamp,
      amount: _.reduce(entries, (acc, { amount }) => amount > 0 ? acc : acc - amount, 0)
    }))

    const days = 30
    const maxToSpend = 300000

    // data = data.filter((value, key))
    let beginningOfMonth = moment(currentDate).startOf('month').unix()
    let endOfMonth = moment(currentDate).endOf('month').unix()
    data = data.filter(({amount, timestamp}) => (
      timestamp >= beginningOfMonth && timestamp <= endOfMonth
    ))

    let newData = []
    let previous = { y: 0 }
    _.each(data, ({amount, timestamp}) => {
      let newEntry = {
        x: Number(moment.unix(timestamp).format('D')),
        y: previous.y + amount
      }
      newData.push(newEntry)
      previous = newEntry
    })

    return (
      <div>
        {this.state.loading ? <span>Loading...</span> :
          <div>
            <ChartWrapper
              currentDate={currentDate}
              period={period}
              onPeriodChange={::this.changePeriod}
              maxToSpend={maxToSpend}
              data={newData}
            />
          </div>
        }
      </div>
    );
  }
}