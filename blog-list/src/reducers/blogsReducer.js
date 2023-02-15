import { createSlice } from '@reduxjs/toolkit'
import servicesBlog from '../services/blogs.js'
import { createNotification } from './notificationReducer.js'

const initialState = []
const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        initializeBlog(state, action) {
            return action.payload
        },
        createBlog(state, action) {
            return [...state, action.payload]
        },
        updateBlog(state, action) {
            const updatedBlog = action.payload
            return state.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
            ).sort((a, b) => b - a)
        },
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload)
        }
    }
})

const { initializeBlog, createBlog, removeBlog, updateBlog } = blogsSlice.actions

export const getBlogs = () => {
    return async dispatch => {
        const blogs = await servicesBlog.getAll()
        dispatch(initializeBlog(blogs))
    }
}

export const addBlog = (content) => {
    return async dispatch => {
        try {
            const newBlog = await servicesBlog.create(content)
            dispatch(createBlog(newBlog))
            dispatch(createNotification(`A new blog ${content.title} by ${content.author}`, 'message', 2))

        } catch (error) {
            dispatch(createNotification('Error adding new message', 'error', 2))
        }
    }
}

export const blogLikes = (id) => {
    return async dispatch => {
        try {
            const blogs = await servicesBlog.getAll()
            const blog = blogs.find(b => b.id === id)
            const changeBlog = {
                ...blog,
                likes: blog.likes + 1
            }
            const updatedBlog = await servicesBlog.update(id, changeBlog)
            dispatch(updateBlog(updatedBlog))

        } catch (error) {
            dispatch(createNotification('Error liking on blog', 'error', 2))
        }
    }
}

export const blogDelete = (id) => {
    return async dispatch => {
        try {
            const { status } = await servicesBlog.remove(id)
            status === 204 && dispatch(removeBlog(id))
            dispatch(createNotification('The selected blog was successfully deleted', 'message', 2))
        } catch (error) {
            error.response.status === 401
                ? dispatch(createNotification('User not authorized to remove this blog', 'error', 2))
                : dispatch(createNotification('Error deleting blog', 'error', 2))
        }
    }
}


export const addComment = (blog, content) => {
    console.log(content)
    return async dispatch => {
        try {
            const { comment, id } = await servicesBlog.createComment(blog.id, { comment: content })
            const newComment = { comment, id }
            const updatedBlog = { ...blog, comments: blog.comments.concat(newComment) }

            dispatch(updateBlog(updatedBlog))

            const message = `Comment added to blog ${updatedBlog.content}`
            dispatch(createNotification(message, 'success', 5))
        } catch (error) {
            const message = 'Error creating a new comment '
            dispatch(createNotification(message, 'error', 5))
        }
    }
}

export default blogsSlice.reducer