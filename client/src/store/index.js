import { configureStore } from '@reduxjs/toolkit'
import iniFetch from './fetch'
import user from './fetchUser'

export default configureStore({
  reducer: {
    fetch : iniFetch,
    userFetch : user
  }
})