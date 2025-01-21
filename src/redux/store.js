import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import toggleReducer from './slice/toggleSlice'
import userReducer from './slice/userSlice'
import productReducer from './slice/productsSlice'


const persistConfig = { key: 'user', storage, };
const persistedUserReducer = persistReducer(persistConfig,userReducer)

const store = configureStore({
    reducer:{
        toggle:toggleReducer,
        user:persistedUserReducer,
        products:productReducer
    }
})
const persistor = persistStore(store);

export {store,persistor}