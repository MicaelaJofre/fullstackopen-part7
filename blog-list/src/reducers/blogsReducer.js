import { createSlice } from '@reduxjs/toolkit'
import servicesBlog from '../services/blogs.js'

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
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload)
        },
        updateBlog(state, action) {
            const updatedBlog = action.payload
            return state.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
            )
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
        const newBlog = await servicesBlog.create(content)
        dispatch(createBlog(newBlog))
    }
}

export const blogLikes = (id) => {
    return async dispatch => {
        const blogs = await servicesBlog.getAll()
        const blog = blogs.find(b => b.id === id)
        const changeBlog = {
            ...blog,
            likes: blog.likes + 1
        }
        const updatedBlog = await servicesBlog.update(id, changeBlog)
        dispatch(updateBlog(updatedBlog))
    }
}

export const blogDelete = (id) => {
    return async dispatch => {
        const blogs = await servicesBlog.getAll()
        const blog = blogs.find(b => b.id === id)
        const removedBlog = await servicesBlog.remove(blog.id)
        dispatch(removeBlog(removedBlog))
    }
}

export default blogsSlice.reducer