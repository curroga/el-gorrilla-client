import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { mockUser } from './mocks/handlers'

// Default auth context values for testing
const defaultAuthContext = {
  isLoggedIn: true,
  isLoading: false,
  user: mockUser,
  isAdminIn: true,
  storeToken: vi.fn(),
  authenticateUser: vi.fn(),
  logOutUser: vi.fn()
}

// Custom render that wraps components with necessary providers
export function renderWithProviders(
  ui,
  {
    authContext = defaultAuthContext,
    route = '/',
    ...renderOptions
  } = {}
) {
  window.history.pushState({}, 'Test page', route)

  function Wrapper({ children }) {
    return (
      <AuthContext.Provider value={authContext}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </AuthContext.Provider>
    )
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    authContext
  }
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { renderWithProviders as render }
