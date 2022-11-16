import service from './config.service';

const getAllCallesService = () => {
  return service.get("/calle")
}

// funciones del CRUD

const createCallesService = (newCalle)=>{
  return service.post("/calle", newCalle)
}

const getCallesDetailsService = (calleId) => {
  return service.get(`/calle/${calleId}`)
}

const deleteCallesService = (calleId) => {
  return service.delete(`/calle/${calleId}`)
}
const updateCallesService = (calleId, callesUpdate) => {
  return service.patch(`/calle/${calleId}`, callesUpdate)
}

const updateCochesEnCallesService = (calleId, cocheId) => {
  return service.patch(`/calle/${calleId}/${cocheId}`)  
}
const deleteCochesEnCallesService = (calleId, cocheId) => {
  return service.patch(`/calle/delete/${calleId}/${cocheId}`)  
}

export {
  getAllCallesService,
  createCallesService,
  getCallesDetailsService,
  deleteCallesService,
  updateCallesService,
  updateCochesEnCallesService,
  deleteCochesEnCallesService
}