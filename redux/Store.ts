import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './CartSlice'
import UserReducer, { loadUserData } from './UserSlice'


export const store = configureStore({
  reducer: {
          cart: CartReducer,
          user: UserReducer,
  },
})

store.dispatch(loadUserData());


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch