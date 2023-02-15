import { useState } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import { useField } from '../hooks/form'

import { Form, Button, FormGroup, Stack } from 'react-bootstrap'

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
                <h2 className='fs-4 fw-bold'>Create a new blog</h2>
                <Form onSubmit={handleCreateBlog}>
                    <FormGroup>
                        <Form.Label className='fw-bold'>Title:</Form.Label>
                        <Form.Control {...title} />
                        <Form.Label className='fw-bold'>Author:</Form.Label>
                        <Form.Control {...author} />
                        <Form.Label className='fw-bold'>Url:</Form.Label>
                        <Form.Control {...url} />
                        <Stack className="col-md-5 mt-2 mb-2">
                            <Button className='fw-bold hover-overlay' variant="warning" id='create-button' type="submit">Create</Button>
                        </Stack>
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