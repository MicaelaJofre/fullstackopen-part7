import { useDispatch, useSelector } from 'react-redux'
import { blogDelete, blogLikes } from '../reducers/blogsReducer'
import Comments from './Comments'

import { Button, Table } from 'react-bootstrap'

const Blog = ({ blog }) => {

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

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
            <h2>Blog App</h2>
            <Table striped bordered hover variant="dark">
                {
                    blog && user
                        ? <>
                            <thead>
                                <tr>
                                    <th>{blog.title}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{blog.url}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Likes: {blog.likes}</td>
                                    <td><Button variant="warning" onClick={() => handleLikes(blog)}>like</Button></td>
                                </tr>
                                <tr>
                                    <td>Added by {blog.author}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        {user.username === blog.user.username && <Button variant="warning" onClick={() => handleDelete(blog)}>Remove</Button>}
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </>
                        : <p>No blogs created</p>
                }
            </Table>
            <Comments blog={blog} />
        </div>
    )
}

export default Blog