import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'



const Users = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [])

    return (
        <div>
            <h2>Users</h2>
            <span><strong>blog created</strong></span>
            {
                users.map(user => {
                    return (
                        <div key={user.id}>
                            <Link to={`/users/${user.id}`}><strong>{user.name} </strong></Link>
                            <span>{user.blogs.length}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Users