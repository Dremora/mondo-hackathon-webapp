import React, { Component } from 'react'
import moment from 'moment'
import LineChart from './LineChart'
import PieChart from './PieChart'
import BarChart from './BarChart'
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
  previousMonth() {
    this.props.onMonthChange(moment(this.props.currentDate).subtract(1, 'month').toDate())
  }

  nextMonth() {
    this.props.onMonthChange(moment(this.props.currentDate).add(1, 'month').toDate())
  }

  render () {
    const { onPeriodChange, period, maxToSpend, accumulatedData, data } = this.props
    const month = moment(this.props.currentDate).format('MMMM YYYY')

    return <div style={styles.container}>
      <div style={styles.tabs}>
        <div
          onClick={() => onPeriodChange('week')}
          style={[styles.tab, period === 'week' && styles.activeTab]}
        >
          <span style={styles.period}>This week</span>
          <span style={styles.amount}>£10</span>
        </div>
        <div
          onClick={() => onPeriodChange('month')}
          style={[styles.tab, period === 'month' && styles.activeTab]}
        >
          <span style={styles.period}>This month</span>
          <span style={styles.amount}>£100</span>
        </div>
        <div
          onClick={() => onPeriodChange('year')}
          style={[styles.tab, period === 'year' && styles.activeTab]}
        >
          <span style={styles.period}>This year</span>
          <span style={styles.amount}>£1000</span>
        </div>
      </div>
      <div style={styles.charts}>
        <BarChart period={period} data={data}/>
        <LineChart period={period} maxToSpend={maxToSpend} data={accumulatedData}/>
        <PieChart label="Coffee" value={42} total={2000}/>
      </div>
    </div>
  }
}
