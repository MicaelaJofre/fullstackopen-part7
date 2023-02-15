import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBlog } from '../reducers/blogsReducer'
import { loginUser } from '../reducers/userReducer'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'
import Notification from './Notification'

import { Table } from 'react-bootstrap'

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
                        <h1 className='pb-4 pt-4'>Blog app</h1>
                        <BlogForm createBlog={handleCreate} />
                    </>
                    : <LoginForm createUser={handleUser} />
            }
            <Table striped bordered hover variant="dark" >
                <tbody>
                    {
                        user
                            ? blogs.length !== 0
                                ? blogs.map(blog =>
                                    <tr key={blog.id} >
                                        <td className='text-capitalize'>
                                            <Link className='text-decoration-none text-white' to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                        </td>

                                    </tr>
                                )
                                : <tr>
                                    <td>No blog created</td>
                                </tr>
                            : null
                    }

                </tbody>
            </Table>


        </div>
    )
}

export default BlogsList