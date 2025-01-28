import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './slice/userSlice'




const persistUserConfig = { key: 'user', storage, };

const persistedUserReducer = persistReducer(persistUserConfig,userReducer)


const store = configureStore({
    reducer:{
        user:persistedUserReducer,
    }
})
const persistor = persistStore(store);

export {store,persistor}