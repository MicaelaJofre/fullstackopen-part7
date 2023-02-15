import { useState } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import { useField } from '../hooks/form'

import { Form, Button, FormGroup } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {

    const [visible, setVisible] = useState(false)

    const Children = () => {

        const { reset: resetTitle, ...title } = useField('title')
        const { reset: resetAuthor, ...author } = useField('author')
        const { reset: resetUrl, ...url } = useField('url')

        const handleCreateBlog = (event) => {
            event.preventDefault()
            createBlog({
                title: title.value,
                author: author.value,
                url: url.value
            })
            setVisible(true)
            resetTitle()
            resetAuthor()
            resetUrl()
        }


        return (
            <>
                <h2>Create a new blog</h2>
                <Form onSubmit={handleCreateBlog}>
                    <FormGroup>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control {...title} />
                        <Form.Label>Author:</Form.Label>
                        <Form.Control {...author} />
                        <Form.Label>Url:</Form.Label>
                        <Form.Control {...url} />
                        <Button variant="warning" id='create-button' type="submit">Create</Button>
                    </FormGroup>
                </Form>
            </>
        )
    }

    BlogForm.propTypes = {
        createBlog: PropTypes.func.isRequired
    }

    return (
        <div>
            <Togglable buttonLabel='Create a new blog' closeForm={visible}>
                <Children />
            </Togglable>
        </div>

    )
}

export default BlogForm