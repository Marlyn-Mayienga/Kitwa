import {configureStore} from '@reduxjs/toolkit'
import user from './slices/user'
import app from './slices/app'


export const store = configureStore({
    reducer:{
        user:user,
        app: app
    }
})