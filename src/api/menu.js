import axios from './axios'

export const  getMenuRequest = () => axios.get('/menu')

export const  getDishRequest = (id) => axios.get(`/dish/${id}`)

export const  createDishRequest = (dish) => axios.post('/dish',dish)

export const  updateDishRequest = (id,dish) => axios.put(`/dish/${id}`,dish)

export const  deleteDishRequest = (id) => axios.delete(`/dish/${id}`)

