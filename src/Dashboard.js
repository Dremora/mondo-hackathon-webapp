import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
  	let daily = this.props.daily
  	let balance = this.props.balance
  	let percentage = daily / balance * 100
    return (
    	<div>
    		<div>{daily}</div>
    		<div>{percentage}%</div>
    	</div>
		)
  }
}