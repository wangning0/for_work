import React from 'react'
import { render } from 'react-dom'
import { browerHistoty } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browerHistoty, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)