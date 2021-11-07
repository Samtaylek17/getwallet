import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import rootReducer from './rootReducer';

const saveSubsetBlacklistFilter = createBlacklistFilter('user', ['isLoading', 'error']);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [saveSubsetBlacklistFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(persistReducer(persistConfig, newRootReducer));
  });
}

export const persistor = persistStore(store);
export default store;
