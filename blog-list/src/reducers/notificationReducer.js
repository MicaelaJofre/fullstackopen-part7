import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', status: '', timeout: null }

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            state.timeout && clearTimeout(state.timeout)
            return action.payload
        },
    }
})

const { setNotification } = notificationSlice.actions

export const createNotification = (message, status, time) => {
    return async dispach => {
        const timeout = setTimeout(() => { dispach(setNotification(initialState)) }, time * 1000)
        dispach(setNotification({ message, status, timeout }))
    }
}


export default notificationSlice.reducer