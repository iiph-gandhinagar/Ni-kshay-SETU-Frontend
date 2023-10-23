import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { MockStore } from '@tb-frontend/shared/MockStore/Store';

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={MockStore}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>

  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }