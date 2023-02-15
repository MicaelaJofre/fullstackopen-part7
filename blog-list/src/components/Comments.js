import { useDispatch } from 'react-redux'
import { useField } from '../hooks/form'
import { addComment } from '../reducers/blogsReducer'

import { Form, Button, FormGroup } from 'react-bootstrap'

const Comments = ({ blog }) => {
    const dispatch = useDispatch()

    const { reset: resetComment, ...comment } = useField('comment')
    if (!blog) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addComment(blog, comment.value))
        resetComment()
    }

    return (
        <div>
            <h3>Comments</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Form.Control {...comment} />
                    <Button variant="warning" type='submit' >Add comment</Button>
                </FormGroup>
            </Form>
            <ul>
                {
                    blog.comments.map(bc => {
                        return (
                            <li key={bc.id}>{bc.comment}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Comments