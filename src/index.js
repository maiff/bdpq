import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'
import Raven from 'raven-js'
Raven.config('https://921035588017413788dd07127334eb82@sentry.io/178352').install()

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root'),
    )
  })
}

