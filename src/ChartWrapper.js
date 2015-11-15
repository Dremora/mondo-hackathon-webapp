import React, { Component } from 'react'
import moment from 'moment'
import LineChart from './LineChart'
import PieChart from './PieChart'
import Radium from 'radium'

var styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
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
    lineHeight: '20px'
  },

  tab: {
    flex: 1,
    textAlign: 'center'
  },

  month: {
    fontSize: '16px',
    color: '#444'
  },

  arrow: {
    color: '#666',
    fontSize: '12px',
    cursor: 'pointer',
  },

  previous: {
    marginRight: '20px'
  },

  next: {
    marginLeft: '20px'
  }
}

@Radium
export default class ChartWrapper extends Component {
  previousMonth() {
    this.props.onMonthChange(moment(this.props.currentDate).subtract(1, 'month').toDate())
  }

  nextMonth() {
    this.props.onMonthChange(moment(this.props.currentDate).add(1, 'month').toDate())
  }

  render () {
    const { onMonthChange, ...props } = this.props
    const month = moment(this.props.currentDate).format('MMMM YYYY')

    return <div style={styles.container}>
      <div style={styles.tabs}>
        <div style={styles.tab}>This week</div>
        <div style={styles.tab}>This month</div>
        <div style={styles.tab}>This year</div>
      </div>
      <div style={styles.charts}>
        <LineChart {...props}/>
        <PieChart label="Coffee" value={42} total={2000}/>
      </div>
    </div>
  }
}
