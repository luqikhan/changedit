// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appCustomers/getAllData', async () => {
  const response = await axios.get('/api/customers/list/all-data')
  return response.data
})



export const getData = createAsyncThunk('appCustomers/getData', async params => {
  const response = await axios.get('/api/customers/list/data', params)
  return {
    params,
    data: response.data.customers,
    totalPages: response.data.total
  }
})

export const getCustomer = createAsyncThunk('appCustomers/getCustomer', async id => {
  const response = await axios.get('/api/customers/customer', { id })
  return response.data.customer
})

export const addCustomer = createAsyncThunk('appCustomers/addCustomer', async (customer, { dispatch, getState }) => {
  await axios.post('/apps/customers/add-customer', customer)
  await dispatch(getData(getState().customers.params))
  await dispatch(getAllData())
  return customer
})

export const deleteCustomer = createAsyncThunk('appCustomers/deleteCustomer', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/customers/delete', { id })
  await dispatch(getData(getState().customers.params))
  await dispatch(getAllData())
  return id
})

export const appCustomersSlice = createSlice({
  name: 'appCustomers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedCustomer: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.selectedCustomer = action.payload
      })
  }
})

export default appCustomersSlice.reducer
