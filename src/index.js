import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { Router, Route, Link } from 'react-router'
import { createHistory } from 'history'
import moment from 'moment'

moment.locale('en-gb')

console.log = console.error = document.write.bind(document)

render((
  <Router history={createHistory()}>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById('root'))
