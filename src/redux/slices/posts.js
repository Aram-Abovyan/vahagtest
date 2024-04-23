import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  entities: [],
  status: 'idle'
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async page => {
  const { data: { data } } = await axios.get(
    'https://reqres.in/api/users',
    {params: {page}}
  )
  return data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.entities = action.payload
        state.status = 'idle'
      })
  }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
