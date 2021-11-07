import { createSlice } from '@reduxjs/toolkit';
import { createWallet, getWallet, getAllWallets, addMoneyToWallet } from '../api/endpoints';

const walletInitialState = {
  walletList: [],
  wallet: {},
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

const wallet = createSlice({
  name: 'wallet',
  initialState: walletInitialState,
  reducers: {
    getWalletStart: startLoading,
    getWalletSuccess(state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.wallet = payload;
    },
    getWalletsSuccess(state, { payload }) {
      state.isLoading = false;
      state.walletList = payload;
      state.error = null;
    },
    getWalletFailure: loadingFailed,
    createWalletStart: startLoading,
    createWalletSuccess(state, { payload }) {
      state.wallet = payload;
      state.isLoading = false;
      state.error = null;
    },
    createWalletFailure: loadingFailed,
  },
});

export const {
  getWalletStart,
  getWalletSuccess,
  getWalletsSuccess,
  getWalletFailure,
  createWalletStart,
  createWalletSuccess,
  createWalletFailure,
} = wallet.actions;

export default wallet.reducer;

export const createWalletAction =
  ({ email }) =>
  async (dispatch) => {
    dispatch(createWalletStart());
    try {
      const walletData = await createWallet({ email });
      dispatch(createWalletSuccess(walletData.data.data));
    } catch (err) {
      dispatch(createWalletFailure(err));
    }
  };

export const fetchAllWallets = () => async (dispatch) => {
  dispatch(getWalletStart());
  try {
    const walletDetails = await getAllWallets();
    dispatch(getWalletsSuccess(walletDetails.data.data));
  } catch (err) {
    dispatch(getWalletFailure(err));
  }
};

export const fetchSingleWallet = (id) => async (dispatch) => {
  dispatch(getWalletStart());
  try {
    const walletDetails = await getWallet(id);
    dispatch(getWalletSuccess(walletDetails.data.data));
  } catch (err) {
    dispatch(getWalletFailure(err));
  }
};

export const fundWallet =
  ({ walletId, currency, amount }) =>
  async (dispatch) => {
    dispatch(getWalletStart());
    try {
      const funded = await addMoneyToWallet({ walletId, currency, amount });
      dispatch(getWalletSuccess(funded.data.data));
    } catch (err) {
      dispatch(getWalletFailure(err));
    }
  };
