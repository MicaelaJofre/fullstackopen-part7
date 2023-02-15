const UserListBlogs = ({ blogsUser }) => {

    return (
        <div>
            <h1>{blogsUser && blogsUser.name}</h1>
            <h2>Added blogs</h2>
            <ul>
                {
                    blogsUser.blogs.length !== 0
                        ? blogsUser.blogs.map(b => {
                            return (
                                <li key={b.id}>{b.title}</li>
                            )
                        })
                        : <p>Not blog</p>
                }
            </ul>

        </div>
    )
}

export default UserListBlogs