import { Table } from 'react-bootstrap'

const UserListBlogs = ({ blogsUser }) => {

    return (
        <div>
            <h1>{blogsUser && blogsUser.name}</h1>
            <h2>Added blogs</h2>
            <Table striped bordered hover variant="dark">
                <tbody>
                    {
                        blogsUser.blogs.length !== 0
                            ? blogsUser.blogs.map(b => {
                                return (
                                    <tr key={b.id}>
                                        <td>
                                            {b.title}
                                        </td>
                                    </tr>
                                )
                            })
                            : <p>Not blog</p>
                    }
                </tbody>
            </Table>

        </div>
    )
}

export default UserListBlogs