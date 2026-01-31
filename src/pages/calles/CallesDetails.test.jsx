import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { render } from '../../test/utils'
import CallesDetails from './CallesDetails'
import { mockCalle, mockCalleWithCars, mockUser } from '../../test/mocks/handlers'

// Mock react-router-dom hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ calleId: 'calle123' }),
    useNavigate: () => vi.fn()
  }
})

// Mock the services
vi.mock('../../services/calles.service', () => ({
  getCallesDetailsService: vi.fn(),
  deleteCallesService: vi.fn()
}))

// Mock CarListNombre component
vi.mock('../../components/cars/CarListNombre', () => ({
  default: ({ calleId, actualizar, cochesAparcados }) => (
    <div data-testid="car-list-nombre">
      <span>Car List for {calleId}</span>
      <span>Parked: {cochesAparcados?.length || 0}</span>
    </div>
  )
}))

// Mock MapViewDetails component
vi.mock('../../components/maps/MapViewDetails', () => ({
  default: ({ detalles }) => (
    <div data-testid="map-view-details">
      Map for {detalles?.name}
    </div>
  )
}))

import { getCallesDetailsService, deleteCallesService } from '../../services/calles.service'

describe('CallesDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading spinner while fetching data', () => {
    getCallesDetailsService.mockImplementation(() => new Promise(() => {}))

    render(<CallesDetails />)

    expect(document.querySelector('.spinner')).toBeInTheDocument()
  })

  it('displays street details after loading', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalle })

    render(<CallesDetails />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Calle Test')
    })

    expect(screen.getByText('Detalles y gestión de aparcamiento')).toBeInTheDocument()
  })

  it('displays parking statistics', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalle })

    render(<CallesDetails />)

    await waitFor(() => {
      expect(screen.getByText('📊 Estadísticas')).toBeInTheDocument()
    })

    expect(screen.getByText('Total plazas')).toBeInTheDocument()
    expect(screen.getByText('Libres')).toBeInTheDocument()
    expect(screen.getByText('Ocupadas')).toBeInTheDocument()
  })

  it('shows "Disponible" badge when spots are available', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalle })

    render(<CallesDetails />)

    await waitFor(() => {
      expect(screen.getByText('Disponible')).toBeInTheDocument()
    })
  })

  it('shows admin controls for admin users', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalle })

    render(<CallesDetails />, {
      authContext: {
        isLoggedIn: true,
        user: mockUser,
        isAdminIn: true
      }
    })

    await waitFor(() => {
      expect(screen.getByText(/Editar/)).toBeInTheDocument()
      expect(screen.getByText(/Eliminar/)).toBeInTheDocument()
    })
  })

  it('hides admin controls for non-admin users', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalle })

    render(<CallesDetails />, {
      authContext: {
        isLoggedIn: true,
        user: { ...mockUser, role: 'user' },
        isAdminIn: false
      }
    })

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Calle Test')
    })

    expect(screen.queryByRole('button', { name: /Eliminar/ })).not.toBeInTheDocument()
  })

  it('opens delete confirmation modal when clicking delete', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalle })

    render(<CallesDetails />)

    await waitFor(() => {
      expect(screen.getByText(/Eliminar/)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /Eliminar/ }))

    expect(screen.getByText('¿Eliminar esta calle?')).toBeInTheDocument()
    expect(screen.getByText(/Esta acción no se puede deshacer/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sí, eliminar' })).toBeInTheDocument()
  })

  it('closes modal when clicking cancel', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalle })

    render(<CallesDetails />)

    await waitFor(() => {
      expect(screen.getByText(/Eliminar/)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /Eliminar/ }))
    expect(screen.getByText('¿Eliminar esta calle?')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    await waitFor(() => {
      expect(screen.queryByText('¿Eliminar esta calle?')).not.toBeInTheDocument()
    })
  })

  it('displays parked cars section when cars are parked', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalleWithCars })

    render(<CallesDetails />)

    await waitFor(() => {
      expect(screen.getByText('🚘 Coches aparcados')).toBeInTheDocument()
    })
  })

  it('shows "Tu coche" badge for user\'s own cars', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalleWithCars })

    render(<CallesDetails />)

    await waitFor(() => {
      expect(screen.getByText('Tu coche')).toBeInTheDocument()
    })
  })

  it('renders map component with correct details', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalle })

    render(<CallesDetails />)

    await waitFor(() => {
      expect(screen.getByTestId('map-view-details')).toBeInTheDocument()
      expect(screen.getByText('Map for Calle Test')).toBeInTheDocument()
    })
  })

  it('renders car list component', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalle })

    render(<CallesDetails />)

    await waitFor(() => {
      expect(screen.getByTestId('car-list-nombre')).toBeInTheDocument()
    })
  })

  it('has back to calles link', async () => {
    getCallesDetailsService.mockResolvedValue({ data: mockCalle })

    render(<CallesDetails />)

    await waitFor(() => {
      expect(screen.getByText(/Volver a Calles/)).toBeInTheDocument()
    })

    const backLink = screen.getByRole('link', { name: /Volver a Calles/ })
    expect(backLink).toHaveAttribute('href', '/calles')
  })
})
