import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  data: [],
  loading: false,
}

export const getPosts = createAsyncThunk(
  'posts/getPosts', async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=1&_limit=6`)
     .then((data) => data.json());
    return res
  })


export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // eslint-disable-next-line 
    builder.addCase(getPosts.pending, (state) => {
    state.loading = true
    }),
      builder.addCase(getPosts.fulfilled, (state, { payload }) => {
        // eslint-disable-next-line 
        state.loading = false,
        state.data = payload
      }),
      builder.addCase(getPosts.rejected, (state) => {
        state.loading = false
        console.error(state)
      })
  },
})

export default postSlice.reducer