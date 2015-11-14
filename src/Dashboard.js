import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
  	let daily = this.props.daily
  	let balance = this.props.balance
  	let health = daily / balance * 100
    return (
    	<div className="dash"><h1>TODAY</h1>
    		<div id="daily">
          <h3>expenditure:</h3>
          <p>{daily}</p>
        </div>
    		<div id="health">
          <h3>health:</h3>
          <p>{health}%</p>
        </div>
    	</div>
		)
  }
}