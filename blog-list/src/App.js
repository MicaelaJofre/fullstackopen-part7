import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './main.css'
import { blogInitialize } from './reducers/blogsReducer'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [user, setUser] = useState(null)
    const [messageNotification, setMessageNotification] = useState({ message: null, status: null })

    useEffect(() => {

        /* const sortPostsByLikes = (posts) => {
            return posts.sort((a, b) => b.likes - a.likes)
        }

        const getBlogs = async () => {
            const blogs = await blogService.getAll()
            setBlogs(sortPostsByLikes(blogs))
        }
        getBlogs()*/

        blogInitialize()

    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addUser = async (userObject) => {

        try {
            const user = await loginService.login({ username: userObject.username, password: userObject.password })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)

            setMessageNotification({ message: 'User register correctamente', status: 'message' })
            setTimeout(() => {
                setMessageNotification({ message: null, status: null })
            }, 5000)



        } catch (error) {

            setMessageNotification({ message: 'Wrong username or password', status: 'error' })
            setTimeout(() => {
                setMessageNotification({ message: null, status: null })
            }, 5000)
        }
    }


    const addBlog = async (blogObject) => {

        try {

            const returnedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(returnedBlog))

            setMessageNotification({ message: `A new blog ${returnedBlog.title} by ${returnedBlog.author}`, status: 'message' })
            setTimeout(() => {
                setMessageNotification({ message: null, status: null })
            }, 5000)

        } catch (error) {

            setMessageNotification({ message: 'Error adding new message', status: 'error' })
            setTimeout(() => {
                setMessageNotification({ message: null, status: null })
            }, 5000)
        }
    }

    const updateBlog = async (blog) => {

        try {
            const newBlog = {
                user: blog.user.id,
                likes: blog.likes + 1,
                author: blog.author,
                title: blog.title,
                url: blog.url
            }

            const updateBlog = await blogService.update(blog.id, newBlog)
            setBlogs(blogs.map(blog => blog.id === updateBlog.id ? updateBlog : blog))

        } catch (error) {
            setMessageNotification({ message: 'Error liking on blog', status: 'error' })
            setTimeout(() => {
                setMessageNotification({ message: null, status: null })
            }, 5000)
        }
    }

    const deleteBlog = async (blog) => {

        try {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
                await blogService.remove(blog.id)
                setBlogs(blogs.filter(b => b.id !== blog.id))
            }
        } catch (error) {
            setMessageNotification({ message: 'Error deleting blog', status: 'error' })
            setTimeout(() => {
                setMessageNotification({ message: null, status: null })
            }, 5000)
        }
    }



    return (
        <div>
            <Notification messageNotification={messageNotification} />
            {
                user
                    ? <><h1>Blogs</h1>
                        <span>{user.name} logged in </span>
                        <BlogForm createBlog={addBlog} />
                    </>

                    : <LoginForm createUser={addUser} />

            }
            <br />
            {
                user
                    ? blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} handleLikes={updateBlog} handleDelete={deleteBlog} user={user} />
                    )
                    : null
            }
        </div>
    )
}

export default App
