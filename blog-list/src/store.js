import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'


const reducer = {
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer
}

const store = configureStore({
    reducer
})

export default store