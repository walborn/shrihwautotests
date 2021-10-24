
import React from 'react'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'

import { Application } from 'src/client/Application'

import { StoreProvider } from 'test/unit/utils/StoreProvider'

export const Root: React.FC<React.ComponentProps<any>> = ({ path }) => {
  const history = createMemoryHistory({
    initialEntries: [ path ],
    initialIndex: 0,
  })

  return (
    <Router history={history}>
      <StoreProvider>
        <Application />
      </StoreProvider>
    </Router>
  )
}
