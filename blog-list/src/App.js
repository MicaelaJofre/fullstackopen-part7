import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { getBlogs, addBlog, blogLikes, blogDelete } from './reducers/blogsReducer'
import { initialUser } from './reducers/userReducer'
import './main.css'

const App = () => {
    const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getBlogs())
    }, [])

    const addUser = (userObject) => {
        dispatch(initialUser(userObject))
    }


    const handleCreate = (blogObject) => {
        dispatch(addBlog(blogObject))
    }

    const handleLikes = (blog) => {
        dispatch(blogLikes(blog.id))
    }

    const handleDelete = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(blogDelete(blog.id))
        }
    }



    return (
        <div>
            <Notification />
            {
                user
                    ? <><h1>Blogs</h1>
                        <span>{user.username} logged in </span>
                        <BlogForm createBlog={handleCreate} />
                    </>
                    : <LoginForm createUser={addUser} />
            }
            <br />
            {
                user
                    ? blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleDelete={handleDelete} user={user} />
                    )
                    : null
            }
        </div>
    )
}

export default App
