import React, { Component } from 'react';
import Pie from "./Pie";
import gaussian from 'gaussian'
import _ from 'lodash'
import Dashboard from './Dashboard';
import ChartWrapper from './ChartWrapper';

export class App extends Component {
  render() {
    const days = 30
    const maxToSpend = 500
    const distribution = gaussian(maxToSpend / days, 50)
    const data = _.range(1, days + 1).map(day => {
      return Math.ceil(distribution.ppf(Math.random()))
    })

    return (
      <div>
        <Dashboard daily={100} balance={200}/>
        <div className="report">
          <h2>tracking your progress...</h2>
          <ChartWrapper onMonthChange={() => {}} maxToSpend={maxToSpend} data={data}/>
      	</div>
        <Pie />
      </div>
    );
  }
}