import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers } from '../../services/api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const data = await getUsers()
  return data
})

const initialState = { list: [], isLoading: false, error: null }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleAdminStatus: (state, action) => {
      const userId = action.payload
      const user = state.list.find(u => u.id === userId)
      if (user) user.admin = !user.admin
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error?.message || 'Failed to fetch users'
      })
  }
})

export const { toggleAdminStatus } = usersSlice.actions
export default usersSlice.reducer
