import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { Router, Route, Link } from 'react-router'

render((
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById('root'))
