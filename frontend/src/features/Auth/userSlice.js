import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

export const register = createAsyncThunk('user/register', async (payload) => {
  // call API to register user
  const data = await userApi.register(payload);
  // save data to local storage
  //return user data
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: null,
    settings: {},
  },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});
const { actions, reducer } = userSlice;
export default reducer;
