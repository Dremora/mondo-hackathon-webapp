import React, { Component } from 'react'
import moment from 'moment'
import LineChart from './LineChart'
import PieChart from './PieChart'
import Radium from 'radium'

var styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10px'
  },

  charts: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },

  tabs: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    lineHeight: '20px',
    width: '450px'
  },

  tab: {
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    color: '#607eb2',
    flexDirection: 'column',
    paddingBottom: '5px',
    cursor: 'pointer'
  },

  activeTab: {
    borderBottom: '2px solid #62d68b'
  },

  period: {
    textTransform: 'uppercase'
  },

  amount: {
    fontSize: '12px',
    color: '#444',
    fontWeight: 'bold'
  }
}

@Radium
export default class ChartWrapper extends Component {
  constructor() {
    super()
    this.state = {
      period: 'week'
    }
  }

  previousMonth() {
    this.props.onMonthChange(moment(this.props.currentDate).subtract(1, 'month').toDate())
  }

  nextMonth() {
    this.props.onMonthChange(moment(this.props.currentDate).add(1, 'month').toDate())
  }

  setPeriod(period) {
    this.setState({
      period
    })
  }

  render () {
    const { onMonthChange, ...props } = this.props
    const month = moment(this.props.currentDate).format('MMMM YYYY')

    return <div style={styles.container}>
      <div style={styles.tabs}>
        <div
          onClick={() => this.setPeriod('week')}
          style={[styles.tab, this.state.period === 'week' && styles.activeTab]}
        >
          <span style={styles.period}>This week</span>
          <span style={styles.amount}>£10</span>
        </div>
        <div
          onClick={() => this.setPeriod('month')}
          style={[styles.tab, this.state.period === 'month' && styles.activeTab]}
        >
          <span style={styles.period}>This month</span>
          <span style={styles.amount}>£100</span>
        </div>
        <div
          onClick={() => this.setPeriod('year')}
          style={[styles.tab, this.state.period === 'year' && styles.activeTab]}
        >
          <span style={styles.period}>This year</span>
          <span style={styles.amount}>£1000</span>
        </div>
      </div>
      <div style={styles.charts}>
        <LineChart {...props}/>
        <PieChart label="Coffee" value={42} total={2000}/>
      </div>
    </div>
  }
}
