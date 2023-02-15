import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

import { Table } from 'react-bootstrap'


const Users = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [])

    return (
        <div>
            <h2 className='pb-4 pt-4'>Users</h2>
            <p className='pb-2 fw-bold fs-5'>Blog created</p>
            <Table striped bordered hover variant="dark">
                <tbody>
                    {
                        users.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td className='text-capitalize'>
                                        <Link className='text-decoration-none text-white' to={`/users/${user.id}`}><strong>{user.name} </strong></Link>
                                    </td>
                                    <td>
                                        <span>{user.blogs.length}</span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Users