import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constant/storage-keys';

export const register = createAsyncThunk('user/register', async (payload) => {
  // call API to register user
  const data = await userApi.register(payload);
  // save data to local storage
  //return user data
  return data;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  // call API to register user
  const data = await userApi.login(payload);
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.data.accessToken);
  //return user data
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: { data: { accessToken: localStorage.getItem(StorageKeys.TOKEN) } } || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.TOKEN);

      state.current = {
        data: {
          accessToken: null,
        },
      };
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});
const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
