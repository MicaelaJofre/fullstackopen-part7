import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBlog } from '../reducers/blogsReducer'
import { loginUser } from '../reducers/userReducer'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'
import Notification from './Notification'

const BlogsList = () => {
    const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleUser = (user) => {
        dispatch(loginUser(user))
    }

    const handleCreate = (newBlog) => {
        dispatch(addBlog(newBlog))
    }


    return (
        <div>
            <Notification />
            {
                user
                    ? <>
                        <h1>Blog app</h1>
                        <BlogForm createBlog={handleCreate} />
                    </>
                    : <LoginForm createUser={handleUser} />
            }
            {
                user
                    ? blogs.length !== 0
                        ? blogs.map(blog =>
                            <div key={blog.id} className='blogList blog' >
                                <div className='blogList'>
                                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                </div>

                            </div>
                        )
                        : <p>No blog created</p>
                    : null
            }

        </div>
    )
}

export default BlogsList