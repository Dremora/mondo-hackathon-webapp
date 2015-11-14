import React, { Component } from 'react';

import Dashboard from './Dashboard';
import Chart from './Chart';

export class App extends Component {
  render() {
    return (
      <div>
        <Dashboard daily={100} balance={200}/>
        <Chart/>
      </div>
    );
  }
}