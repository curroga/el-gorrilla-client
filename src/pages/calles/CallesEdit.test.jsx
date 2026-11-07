import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { render } from '../../test/utils'
import CallesEdit from './CallesEdit'

const navigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ calleId: 'calle123' }),
    useNavigate: () => navigate
  }
})

vi.mock('../../services/calles.service', () => ({
  getCallesDetailsService: vi.fn(),
  updateCallesService: vi.fn()
}))

vi.mock('../../components/maps/MapWithDrag', () => ({
  default: () => <div data-testid="map-with-drag" />
}))

import { getCallesDetailsService, updateCallesService } from '../../services/calles.service'

const calle = {
  _id: 'calle123',
  name: 'Gran Vía',
  numAparcamientos: 10,
  ocupadosExternos: 3,
  numOcupados: 5,
  numLibres: 5,
  positionMarker: [40.42, -3.7]
}

const field = (name) => document.querySelector(`input[name="${name}"]`)

describe('CallesEdit', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getCallesDetailsService.mockResolvedValue({ data: calle })
    updateCallesService.mockResolvedValue({})
  })

  it('shows the admin adjustment and no manual occupied/free counters', async () => {
    render(<CallesEdit />)

    await waitFor(() => expect(field('ocupadosExternos')).toBeInTheDocument())
    expect(field('ocupadosExternos')).toHaveValue(3)
    expect(screen.getByText('Ocupados por coches fuera de la app:')).toBeInTheDocument()
    expect(field('numOcupados')).toBeNull()
    expect(field('numLibres')).toBeNull()
  })

  it('sends the adjustment and never the computed counters', async () => {
    render(<CallesEdit />)
    await waitFor(() => expect(field('ocupadosExternos')).toBeInTheDocument())

    fireEvent.change(field('ocupadosExternos'), { target: { value: '4' } })
    fireEvent.click(screen.getByRole('button', { name: 'Editar Calle' }))

    await waitFor(() => expect(updateCallesService).toHaveBeenCalledTimes(1))
    expect(updateCallesService).toHaveBeenCalledWith('calle123', {
      name: 'Gran Vía',
      numAparcamientos: 10,
      ocupadosExternos: '4',
      positionMarker: [40.42, -3.7]
    })
    expect(navigate).toHaveBeenCalledWith('/calles/calle123/details')
  })
})
