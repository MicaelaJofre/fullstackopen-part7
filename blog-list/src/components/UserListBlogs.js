import { Table } from 'react-bootstrap'

const UserListBlogs = ({ blogsUser }) => {

    return (
        <div>
            <h2 className='pb-4 pt-4 text-capitalize'>{blogsUser && blogsUser.name}</h2>
            <p className='pb-2 fw-bold fs-5'>Added blogs</p>
            <Table striped bordered hover variant="dark">
                <tbody>
                    {
                        blogsUser.blogs.length !== 0
                            ? blogsUser.blogs.map(b => {
                                return (
                                    <tr key={b.id} className='text-capitalize'>
                                        <td>
                                            {b.title}
                                        </td>
                                    </tr>
                                )
                            })
                            : <tr>
                                <td>Not blog</td>
                            </tr>
                    }
                </tbody>
            </Table>

        </div>
    )
}

export default UserListBlogs