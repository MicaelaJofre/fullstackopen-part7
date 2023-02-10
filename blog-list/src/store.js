import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'


const reducer = {
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer
}

const store = configureStore({
    reducer
})

export default store