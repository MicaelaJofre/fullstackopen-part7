import { servicesBlog } from '../services/blogs'

export const blogReducer = (state = [], action) => {

    switch (action.type) {
        case '@blog/initialize': {
            return action.data
        }

        case '@blog/create': {
            return [...state, action.data]
        }

        case '@blog/likes': {
            let id = action.data.id
            const blogToChange = state.find(s => s.id === id)
            return state.map(blog =>
                blog.id !== id ? blog : {
                    ...blogToChange,
                    likes: blogToChange.likes + 1
                }
            ).sort((a, b) => b.likes - a.likes)
        }

        case '@blog/delete': {
            let blogId = action.data.id
            return state.filter(blog =>
                blog.id !== blogId
            )
        }
        default: {
            return state
        }

    }

}


export const blogInitialize = () => {
    return async dispatch => {
        const blogs = servicesBlog.getAll()
        dispatch({
            type: '@blog/initialize',
            data: blogs
        })
    }

}

export const blogCreate = (content) => {
    return async dispatch => {
        const newBlog = await servicesBlog.create(content)
        dispatch({
            type: '@blog/create',
            data: newBlog
        })
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
        const updateBlog = await servicesBlog.update(id, changeBlog)
        dispatch({
            type: '@blog/likes',
            data: updateBlog
        })
    }
}

export const blogDelete = (id) => {
    return async dispatch => {
        const blogs = await servicesBlog.getAll()
        const blog = blogs.find(b => b.id === id)
        const removeBlog = await servicesBlog.remove(blog.id)
        dispatch({
            type: '@blog/delete',
            data: removeBlog
        })
    }
}