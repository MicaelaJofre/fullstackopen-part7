import { useState } from 'react'

const Blog = ({ blog, username, handleLikes, handleDelete }) => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div key={blog.id} className='blogList blog' >
            <div className='blogList'>
                <span>{blog.title} -  </span>
                <span>Author: {blog.author}</span>
                <button onClick={handleShow}>view</button>
            </div>
            {
                show &&
                <div>
                    <div>Url: {blog.url}</div>
                    <div>
                        Likes: {blog.likes}
                        <button onClick={() => handleLikes(blog)}>like</button>
                    </div>
                    <div>User: {blog.user.name}</div>
                    {username === blog.user.username && <button onClick={() => handleDelete(blog)}>Remove</button>}
                </div>
            }
        </div>

    )
}

export default Blog