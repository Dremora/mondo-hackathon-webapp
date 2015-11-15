import React, { Component } from 'react'
import { VictoryChart, VictoryPie, VictoryAxis } from "victory"
import {Pie,Bar, SmoothLine,StockLine,Scatterplot,Tree,Radar} from 'react-pathjs-chart';
import moment from 'moment'

// APIURL http://2fef1536.ngrok.com/app_dev.php/v1/transactions


export default ({value, label, total}) => {
  let data = [
    { x: label, y: value / total },
    { x: "Everything else", y: (total - value) / total }
  ]

  return (
    <VictoryPie
      data={data}
      animate={{velocity: 0.02}}
      style={{
       labels: {
         fill: '#555',
         fontSize: 14,
         fontFamily: null
       }
     }}
      sliceColors={['#fff3ba', '#9effb9']}
    />
  );
}
