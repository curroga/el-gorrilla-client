// Mock data for tests
export const mockUser = {
  _id: 'user123',
  username: 'testuser',
  email: 'test@test.com',
  role: 'admin'
}

export const mockCalle = {
  _id: 'calle123',
  name: 'Calle Test',
  numAparcamientos: 10,
  numOcupados: 0,
  numLibres: 0,
  positionMarker: [37.17913, -5.77595],
  coches: []
}

export const mockCalleWithCars = {
  ...mockCalle,
  coches: [
    { _id: 'car1', modelo: 'Seat Ibiza', matricula: '1234ABC', owner: 'user123' },
    { _id: 'car2', modelo: 'Ford Focus', matricula: '5678DEF', owner: 'other-user' }
  ]
}

export const mockCars = [
  { _id: 'car1', modelo: 'Seat Ibiza', matricula: '1234ABC', owner: 'user123' },
  { _id: 'car2', modelo: 'Mercedes', matricula: '9999XYZ', owner: 'user123' }
]
