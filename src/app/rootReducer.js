import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import walletReducer from '../slices/walletSlice';

const rootReducer = combineReducers({
  user: authReducer,
  wallet: walletReducer,
});

export default rootReducer;
