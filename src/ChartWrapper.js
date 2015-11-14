import React, { Component } from 'react'
import moment from 'moment'
import Chart from './Chart'
import Radium from 'radium'

var styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },

  monthContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    lineHeight: '20px'
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
  },

  chart: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
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
      <div style={styles.monthContainer}>
        <span onClick={::this.previousMonth} style={[styles.arrow, styles.previous]}>PREVIOUS</span>
        <span style={styles.month}>{month}</span>
        <span onClick={::this.nextMonth} style={[styles.arrow, styles.next]}>NEXT</span>
      </div>
      <div style={styles.chart}><Chart {...props}/></div>
    </div>
  }
}
