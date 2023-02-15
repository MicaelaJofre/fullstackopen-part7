import { useDispatch } from 'react-redux'
import { useField } from '../hooks/form'
import { addComment } from '../reducers/blogsReducer'

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
            <form onSubmit={handleSubmit}>
                <input {...comment} />
                <button>Add comment</button>
            </form>
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