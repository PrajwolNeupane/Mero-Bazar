import {configureStore} from '@reduxjs/toolkit';
import storeSlice from './State Management/Features/User/storeSlice';
import userSlice from './State Management/Features/User/userSlice';

export const Store = configureStore({
    reducer:{
        User:userSlice,
        Store:storeSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});