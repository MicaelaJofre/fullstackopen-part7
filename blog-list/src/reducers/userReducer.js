import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer.js'

const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser(state, action) {
            blogService.setToken(action.payload.token)
            return action.payload
        }
    }
})

const { getUser } = userSlice.actions

export const initialUser = (user) => {
    return async dispatch => {
        try {
            const logged = await loginService.login(user)
            dispatch(getUser(logged))
            dispatch(createNotification('User logged correctly', 'message', 2))
        } catch (error) {
            dispatch(createNotification('Wrong username or password', 'error', 2))
        }
    }
}

export default userSlice.reducer