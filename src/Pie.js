import React, { Component } from 'react'
import { VictoryChart, VictoryPie, VictoryAxis } from "victory"
import {Pie,Bar, SmoothLine,StockLine,Scatterplot,Tree,Radar} from 'react-pathjs-chart';
import moment from 'moment'

// APIURL http://2fef1536.ngrok.com/app_dev.php/v1/transactions


export default class PieChart extends Component {
   constructor(props) {
    super(props);
    this.state = {data: this.getData()};
  }

  getData() {
    return [
      { x: "groceries", y: 51 / 360 * Math.PI },
      { x: "food", y: 50 / 360 * Math.PI },
      { x: "shopping", y: 0.2 + Math.random() },
      { x: "birthdays", y: 0.2 + Math.random() },
      { x: "holidays", y: 0.2 + Math.random() }
    ];
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({data: this.getData()});
    }, 3000);
  }

  render() {
    return (
      <VictoryPie
        data={this.state.data}
        animate={{velocity: 0.02}}/> 
    );
  }
}
