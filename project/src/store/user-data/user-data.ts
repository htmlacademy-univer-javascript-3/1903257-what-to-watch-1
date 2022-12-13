import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import { UserProcess } from '../../types/user-process';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { saveToken } from '../../components/services/token';
import { saveAvatarURL } from '../../components/services/avatar';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  avatar: null,
  userId: null
};

export const userProcessSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.avatar = action.payload.avatarUrl;
        saveAvatarURL(action.payload.avatarUrl);
        state.userId = action.payload.userId;
        state.authorizationStatus = AuthorizationStatus.Auth;

      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.avatar = null;
        state.userId = null;
      });
  }
});

export default userProcessSlice.reducer;
