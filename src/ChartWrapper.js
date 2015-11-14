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
  constructor (props) {
    super(props)
    this.state = {
      currentDate: new Date()
    }
  }

  previousMonth() {
    this.setState({
      currentDate: moment(this.state.currentDate).subtract(1, 'month').toDate()
    })
    this.props.onMonthChange(this.state.currentDate)
  }

  nextMonth() {
    this.setState({
      currentDate: moment(this.state.currentDate).add(1, 'month').toDate()
    })
    this.props.onMonthChange(this.state.currentDate)
  }

  render () {
    const month = moment(this.state.currentDate).format('MMMM YYYY')

    return <div style={styles.container}>
      <div style={styles.monthContainer}>
        <span onClick={::this.previousMonth} style={[styles.arrow, styles.previous]}>PREVIOUS</span>
        <span style={styles.month}>{month}</span>
        <span onClick={::this.nextMonth} style={[styles.arrow, styles.next]}>NEXT</span>
      </div>
      <div style={styles.chart}><Chart/></div>
    </div>
  }
}
