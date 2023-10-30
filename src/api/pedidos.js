import axios from './axios'

export const  getOrdersRequest = () => axios.get('/orders')

export const  getOrderRequest = (id) => axios.get(`/order/${id}`)

export const  createOrderRequest = (order) => axios.post('/order',order)

export const  updateOrderRequest = (id,order) => axios.put(`/order/${id}`,order)

export const  deleteOrderRequest = (id) => axios.delete(`/order/${id}`)
