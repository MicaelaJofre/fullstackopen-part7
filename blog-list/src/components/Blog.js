import { useDispatch, useSelector } from 'react-redux'
import { blogDelete, blogLikes } from '../reducers/blogsReducer'
import Comments from './Comments'

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
            {
                blog && user
                    ? <div>
                        <h3>{blog.title}</h3>
                        <div>{blog.url}</div>
                        <div>
                            Likes: {blog.likes}
                            <button onClick={() => handleLikes(blog)}>like</button>
                        </div>
                        <span>Added by {blog.author}</span>
                        <div>
                            {user.username === blog.user.username && <button onClick={() => handleDelete(blog)}>Remove</button>}
                        </div>
                    </div>
                    : <p>No blogs created</p>
            }
            <Comments blog={blog} />
        </div>
    )
}

export default Blog