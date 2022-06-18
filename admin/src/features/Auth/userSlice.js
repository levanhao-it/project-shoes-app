import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../components/api/userApi';
import StorageKeys from '../../components/constant/storage-keys';
import Cookies from 'js-cookie';

export const login = createAsyncThunk('user/login', async (payload) => {
  // call API to register user
  const data = await userApi.login(payload);
  // save data to cookie
  Cookies.set(StorageKeys.TOKEN, data.data.accessToken);
  //return user data
  return data;
});

export const register = createAsyncThunk('user/register', async (payload) => {
  // call API to register user
  const data = await userApi.register(payload);
  // save data to cookie
  //return user data
  return data;
});

// export const edit = createAsyncThunk('user/edit', async (id, payload) => {
//   console.log(id, payload);
//   // call API to register user
//   const data = await userApi.update(id, payload);
//   // save data to cookie
//   //return user data
//   return data;
// });

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: { data: { accessToken: Cookies.get(StorageKeys.TOKEN) } } || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      // clear cookie
      Cookies.remove(StorageKeys.TOKEN);

      state.current = {
        data: {
          accessToken: null,
        },
      };
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});
const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
