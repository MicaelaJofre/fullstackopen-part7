import { useDispatch, useSelector } from 'react-redux'
import { blogDelete, blogLikes } from '../reducers/blogsReducer'
import Comments from './Comments'
import Notification from './Notification'

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
            <Notification />
            <h2 className='pb-4 pt-4'>Blog App</h2>
            <Table striped bordered hover variant="dark">
                {
                    blog && user
                        ? <>
                            <thead>
                                <tr>
                                    <th>Title:</th>
                                    <td className='text-capitalize'>{blog.title}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Url: </th>
                                    <td className='text-capitalize'>{blog.url}</td>
                                </tr>
                                <tr>
                                    <th>Likes: </th>
                                    <td>{blog.likes} <Button className='fw-bold hover-overlay ms-2' variant="warning" onClick={() => handleLikes(blog)}>like</Button></td>
                                </tr>
                                <tr>
                                    <th>Author: </th>
                                    <td className='text-capitalize'>Added by {blog.author}</td>
                                </tr>
                                <tr>
                                    <td>
                                        {user.username === blog.user.username && <Button className='fw-bold hover-overlay' variant="warning" onClick={() => handleDelete(blog)}>Remove</Button>}
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </>
                        : <tbody>
                            <tr>
                                <td>No blog created</td>
                            </tr>
                        </tbody>
                }
            </Table>
            <Comments blog={blog} />
        </div>
    )
}

export default Blog