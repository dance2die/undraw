import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'

import Home from './components/Home'

import './styles/index.scss'

function App() {
  return (
    <Router>
      <Home path='/' />
    </Router>
  )
}

render(<App />, document.getElementById('root'))
