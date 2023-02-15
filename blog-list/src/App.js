import { Routes, Route, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getBlogs } from './reducers/blogsReducer'
import { initialUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import UserListBlogs from './components/UserListBlogs'
import Users from './components/Users'
import Menu from './components/Menu'
import Blog from './components/Blog'
import BlogsList from './components/BlogsList'

const App = () => {
    const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlogs())
        dispatch(initialUser())
        dispatch(initializeUsers())
    }, [])

    const match = useMatch('/users/:id')
    const blogsUser = match
        ? users.find(user => user.id === match.params.id)
        : null

    const matchBlogs = useMatch('/blogs/:id')
    const blog = matchBlogs
        ? blogs.find(blog => blog.id === matchBlogs.params.id)
        : null

    return (
        <div className='bg-dark text-white' style={{ minHeight: '100vh' }}>
            <div className="container p-2">
                < Menu />
                <Routes>
                    <Route path='/' element={<BlogsList blog={blog} />} />
                    <Route path='/blogs/:id' element={<Blog blog={blog} />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/users/:id' element={<UserListBlogs blogsUser={blogsUser} />} />
                </Routes>
            </div >
        </div >
    )
}


export default App
