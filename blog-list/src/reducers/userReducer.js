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
            window.localStorage.setItem('user', JSON.stringify(action.payload))
            blogService.setToken(action.payload.token)
            return action.payload
        },
        logout() {
            window.localStorage.removeItem('user')
            return null
        }
    }
})

const { getUser, logout } = userSlice.actions

export const initialUser = () => {
    return async (dispatch) => {
        const user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null
        if (!user) return
        dispatch(getUser(user))
    }
}

export const loginUser = (user) => {
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

export const logoutUser = () => {
    return dispatch => {
        dispatch(logout())
    }
}


export default userSlice.reducer