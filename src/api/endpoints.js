import api from './api';

export async function createWallet({ email }) {
  const url = `${process.env.REACT_APP_BASE_URL}/wallets`;
  return api.post(url, { customer_email: email });
}

export async function getAllWallets() {
  const url = `${process.env.REACT_APP_BASE_URL}/wallets`;
  return api.get(url);
}

export async function getWallet(id) {
  const url = `${process.env.REACT_APP_BASE_URL}/wallets/${id}`;
  return api.get(url);
}

export async function addMoneyToWallet({ walletId, currency, amount }) {
  const url = `${process.env.REACT_APP_BASE_URL}/wallets/funds/manual`;
  return api.post(url, { wallet_id: walletId, currency, amount });
}
