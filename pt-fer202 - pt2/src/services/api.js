 import axios from 'axios'

 // Preconfigured Axios instance for JSON Server
 export const API = axios.create({
   baseURL: 'http://localhost:3001',
   headers: { 'Content-Type': 'application/json' }
 })

 // Users
 export const getUsers = async () => {
   const res = await API.get('/users')
   return res.data
 }
 export const queryUsers = async (params = {}) => {
   const res = await API.get('/users', { params })
   return res.data
 }
 export const updateUserApi = async (id, payload) => {
   const res = await API.patch(`/users/${id}`, payload)
   return res.data
 }

 // Payments CRUD
 export const getPayments = async (params = {}) => {
   const res = await API.get('/payments', { params })
   return res.data
 }

 export const addPaymentApi = async (payload) => {
   const res = await API.post('/payments', payload)
   return res.data
 }

 export const updatePaymentApi = async (id, payload) => {
   const res = await API.put(`/payments/${id}`, payload)
   return res.data
 }

 export const deletePaymentApi = async (id) => {
   const res = await API.delete(`/payments/${id}`)
   return res.data
 }
