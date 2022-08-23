import { useEffect } from 'react';

import { useAppDispatch } from './../../Hooks/hooks';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Cookies from 'js-cookie';


type InitialState = {
  login: boolean | string | undefined;
  number : string;
  likes: number[]
}

const initialState: InitialState = {
  login: false,
  number : '',
  likes: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      Cookies.set('login', `${payload}`);
      state.login = Cookies.get('login');
    },
    logout: (state) => {
      state.login = false;
      Cookies.set('login', `false`)
    },
    likedposts: (state, { payload }) => {
      state.likes.push(payload);
      // state.likes.push(Object.values(localStorage));
      localStorage.setItem(`postliked-${payload}`, payload);
    },
    dislike: (state, { payload }) => {
      let index = state.likes.indexOf(payload);
      state.likes.splice(index, 1);
      localStorage.removeItem(`postliked-${payload}`)
    }

  }
})


export default userSlice.reducer;
export const { login, logout, likedposts, dislike } = userSlice.actions;