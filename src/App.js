import React, { Component } from 'react';

import Dashboard from './Dashboard';
import ChartWrapper from './ChartWrapper';

export class App extends Component {
  render() {
    return (
      <div>
        <Dashboard daily={100} balance={200}/>
        <ChartWrapper onMonthChange={() => {}}/>
      </div>
    );
  }
}