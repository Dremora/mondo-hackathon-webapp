import React, { Component } from 'react';
import Pie from "./Pie";
import Dashboard from './Dashboard';
import ChartWrapper from './ChartWrapper';

export class App extends Component {
  render() {
    return (
      <div>
        <Dashboard daily={100} balance={200}/>
        <div className="report">
          <h2>tracking your progress...</h2>
          <ChartWrapper onMonthChange={() => {}}/>
      	</div>
        <Pie />
      </div>
    );
  }
}