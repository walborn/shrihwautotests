import React from 'react'
import { Provider } from 'react-redux'

import { CartApi } from 'src/client/api'
import { initStore } from 'src/client/store'

import { MockApi } from 'test/unit/mock/api'

export const StoreProvider: React.FC = ({ children }) => {
  const mockApi = new MockApi('/')
  const cart = new CartApi()
  const store = initStore(mockApi, cart)

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}