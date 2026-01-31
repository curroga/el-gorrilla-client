import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { render } from '../../test/utils'
import CarListNombre from './CarListNombre'
import { mockCars } from '../../test/mocks/handlers'

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

// Mock the services
vi.mock('../../services/cars.service', () => ({
  getAllCarsService: vi.fn()
}))

vi.mock('../../services/calles.service', () => ({
  updateCochesEnCallesService: vi.fn(),
  deleteCochesEnCallesService: vi.fn()
}))

import { getAllCarsService } from '../../services/cars.service'
import { updateCochesEnCallesService, deleteCochesEnCallesService } from '../../services/calles.service'

describe('CarListNombre', () => {
  const defaultProps = {
    calleId: 'calle123',
    actualizar: vi.fn(),
    cochesAparcados: []
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state while fetching cars', () => {
    getAllCarsService.mockImplementation(() => new Promise(() => {}))

    render(<CarListNombre {...defaultProps} />)

    expect(screen.getByText('🚗 Mis Vehículos')).toBeInTheDocument()
  })

  it('displays user cars after loading', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })

    render(<CarListNombre {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByText('Seat Ibiza')).toBeInTheDocument()
      expect(screen.getByText('Mercedes')).toBeInTheDocument()
    })
  })

  it('displays license plate for each car', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })

    render(<CarListNombre {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByText('1234ABC')).toBeInTheDocument()
      expect(screen.getByText('9999XYZ')).toBeInTheDocument()
    })
  })

  it('shows car count badge', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })

    render(<CarListNombre {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  it('shows "Aparcar" button for cars not parked in this street', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })

    render(<CarListNombre {...defaultProps} cochesAparcados={[]} />)

    await waitFor(() => {
      const aparcarButtons = screen.getAllByRole('button', { name: /Aparcar/ })
      expect(aparcarButtons).toHaveLength(2)
    })
  })

  it('shows "Retirar" button for cars parked in this street', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })

    const cochesAparcados = [{ _id: 'car1', modelo: 'Seat Ibiza' }]

    render(<CarListNombre {...defaultProps} cochesAparcados={cochesAparcados} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Retirar/ })).toBeInTheDocument()
    })
  })

  it('shows "Aquí" badge for parked cars', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })

    const cochesAparcados = [{ _id: 'car1', modelo: 'Seat Ibiza' }]

    render(<CarListNombre {...defaultProps} cochesAparcados={cochesAparcados} />)

    await waitFor(() => {
      expect(screen.getByText('Aquí')).toBeInTheDocument()
    })
  })

  it('calls updateCochesEnCallesService when clicking Aparcar', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })
    updateCochesEnCallesService.mockResolvedValue({ data: {} })

    render(<CarListNombre {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByText('Seat Ibiza')).toBeInTheDocument()
    })

    const aparcarButtons = screen.getAllByRole('button', { name: /Aparcar/ })
    fireEvent.click(aparcarButtons[0])

    await waitFor(() => {
      expect(updateCochesEnCallesService).toHaveBeenCalledWith('calle123', 'car1')
    })
  })

  it('calls deleteCochesEnCallesService when clicking Retirar', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })
    deleteCochesEnCallesService.mockResolvedValue({ data: {} })

    const cochesAparcados = [{ _id: 'car1', modelo: 'Seat Ibiza' }]

    render(<CarListNombre {...defaultProps} cochesAparcados={cochesAparcados} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Retirar/ })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /Retirar/ }))

    await waitFor(() => {
      expect(deleteCochesEnCallesService).toHaveBeenCalledWith('calle123', 'car1')
    })
  })

  it('calls actualizar callback after parking a car', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })
    updateCochesEnCallesService.mockResolvedValue({ data: {} })

    render(<CarListNombre {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByText('Seat Ibiza')).toBeInTheDocument()
    })

    const aparcarButtons = screen.getAllByRole('button', { name: /Aparcar/ })
    fireEvent.click(aparcarButtons[0])

    await waitFor(() => {
      expect(defaultProps.actualizar).toHaveBeenCalled()
    })
  })

  it('disables button while loading', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })
    updateCochesEnCallesService.mockImplementation(() => new Promise(() => {}))

    render(<CarListNombre {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByText('Seat Ibiza')).toBeInTheDocument()
    })

    const aparcarButtons = screen.getAllByRole('button', { name: /Aparcar/ })
    fireEvent.click(aparcarButtons[0])

    await waitFor(() => {
      expect(aparcarButtons[0]).toBeDisabled()
    })
  })

  it('shows empty message when user has no cars', async () => {
    getAllCarsService.mockResolvedValue({ data: [] })

    render(<CarListNombre {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByText('No tienes vehículos registrados')).toBeInTheDocument()
    })
  })

  it('applies parked styling to parked car card', async () => {
    getAllCarsService.mockResolvedValue({ data: mockCars })

    const cochesAparcados = [{ _id: 'car1', modelo: 'Seat Ibiza' }]

    render(<CarListNombre {...defaultProps} cochesAparcados={cochesAparcados} />)

    await waitFor(() => {
      const carCards = document.querySelectorAll('.my-car-card')
      const parkedCard = Array.from(carCards).find(card =>
        card.classList.contains('parked')
      )
      expect(parkedCard).toBeInTheDocument()
    })
  })
})
