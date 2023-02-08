import { useState } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks/form'


const BlogForm = ({ createBlog }) => {

    const [visible, setVisible] = useState(false)

    const Children = () => {

        const title = useField('title')
        const author = useField('author')
        const url = useField('url')

        const handleCreateBlog = (event) => {
            event.preventDefault()
            createBlog({
                title: title.value,
                author: author.value,
                url: url.value
            })
            setVisible(true)
        }

        return (
            <>
                <h2>Create a new blog</h2>
                <form onSubmit={handleCreateBlog}>
                    <div>
                        title:
                        <input {...title} />
                    </div>
                    <div>
                        author:
                        <input {...author} />
                    </div>
                    <div>
                        url:
                        <input {...url} />
                    </div>
                    <button id='create-button' type="submit">Create</button>
                </form>
            </>
        )
    }

    BlogForm.propTypes = {
        createBlog: PropTypes.func.isRequired
    }



    const handleSingOut = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        window.location.reload()
    }

    return (
        <div>
            <button onClick={handleSingOut}>Logout</button>
            <Togglable buttonLabel='Create a new blog' closeForm={visible}>
                <Children />
            </Togglable>
        </div>

    )
}

export default BlogForm