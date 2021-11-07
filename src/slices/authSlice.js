import { createSlice } from '@reduxjs/toolkit';
import checkAuth from '../helpers/checkAuth';

const authInitialState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
  error: null,
};

function startLoading(state) {
  state.isLoading = true;
}

function loadingFailed(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

const auth = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    loginStart: startLoading,
    loginSuccess: (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: loadingFailed,
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    getUserSuccess(state, { payload }) {
      state.user = payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess, getUserSuccess } =
  auth.actions;

export default auth.reducer;

export const login =
  ({ tokenId, profileObj }) =>
  async (dispatch) => {
    dispatch(loginStart());
    try {
      localStorage.setItem('token', tokenId);
      const user = checkAuth(tokenId);
      dispatch(loginSuccess(user));
      dispatch(getUserSuccess(profileObj));
    } catch (err) {
      dispatch(loginFailure(err.toString()));
    }
  };

export const logout = () => async (dispatch) => {
  dispatch(loginStart());
  try {
    return dispatch(logoutSuccess());
  } catch (err) {
    dispatch(loginFailure(err.toString()));
  }
};
