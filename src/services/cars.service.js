import service from './config.service'

const getAllCarsService = () => {
  return service.get("/car")
}

const createCarsService = (newCar) => {
  return service.post("/car", newCar)
}

const getCarsDetailsService = (carId) => {
  return service.get(`/car/${carId}`)
}

const deleteCarsService = (carId) => {
  return service.delete(`/car/${carId}`)
}

const updateCarsService = (carId, carUpdate) => {
  return service.patch(`/car/${carId}`, carUpdate)
}

export {
  getAllCarsService,
  createCarsService,
  getCarsDetailsService,
  deleteCarsService,
  updateCarsService
}