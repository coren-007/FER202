 import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
 import { getexpenses, addPaymentApi, updatePaymentApi, deletePaymentApi } from '../services/api'
 import { useAuth } from './AuthContext'

 const PaymentContext = createContext()

 const initialState = {
   expenses: [],
   category: '',
   totalAmount: 0,
   isLoading: false,
   error: null
 }

 function reducer(state, action) {
   switch (action.type) {
     case 'LOAD_START':
       return { ...state, isLoading: true, error: null }
     case 'LOAD_SUCCESS': {
       return { ...state, isLoading: false, expenses: action.payload }
     }
     case 'LOAD_FAILURE':
       return { ...state, isLoading: false, error: action.payload }
     case 'SET_CATEGORY':
       return { ...state, category: action.payload }
     case 'ADD_SUCCESS': {
       const list = [...state.expenses, action.payload]
       return { ...state, expenses: list }
     }
     case 'UPDATE_SUCCESS': {
       const list = state.expenses.map(p => p.id === action.payload.id ? action.payload : p)
       return { ...state, expenses: list }
     }
     case 'DELETE_SUCCESS': {
       const list = state.expenses.filter(p => p.id !== action.payload)
       return { ...state, expenses: list }
     }
     default:
       return state
   }
 }

 export function PaymentProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState)
   const { user } = useAuth()

   const fetchexpenses = async () => {
     try {
       dispatch({ type: 'LOAD_START' })
       const params = user?.id ? { userId: String(user.id) } : {}
       const data = await getexpenses(params)
       dispatch({ type: 'LOAD_SUCCESS', payload: data })
     } catch (e) {
       dispatch({ type: 'LOAD_FAILURE', payload: 'Failed to fetch expenses' })
     }
   }

   const addPayment = async (payload) => {
     const created = await addPaymentApi(payload)
     dispatch({ type: 'ADD_SUCCESS', payload: created })
   }
   const updatePayment = async (id, payload) => {
     const updated = await updatePaymentApi(id, payload)
     dispatch({ type: 'UPDATE_SUCCESS', payload: updated })
   }
   const deletePayment = async (id) => {
     await deletePaymentApi(id)
     dispatch({ type: 'DELETE_SUCCESS', payload: id })
   }

   const setCategory = (category) => dispatch({ type: 'SET_CATEGORY', payload: category })

   useEffect(() => { fetchexpenses() }, [user?.id])

   const visibleExpenses = useMemo(() => {
     const list = state.category ? state.expenses.filter(e => String(e.category).toLowerCase().includes(String(state.category).toLowerCase())) : state.expenses
     return list
   }, [state.expenses, state.category])

   const totalAmount = useMemo(() => visibleExpenses.reduce((s, p) => s + (Number(p.amount) || 0), 0), [visibleExpenses])

   const value = useMemo(() => ({
     expenses: visibleExpenses,
     totalAmount,
     category: state.category,
     loading: state.isLoading,
     error: state.error,
     fetchexpenses,
     addPayment,
     updatePayment,
     deletePayment,
     setCategory
   }), [visibleExpenses, totalAmount, state.category, state.isLoading, state.error])

   return (
     <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
   )
 }

 export const useexpenses = () => useContext(PaymentContext)
