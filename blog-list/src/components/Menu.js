import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const Menu = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigation = useNavigate()

    const handleSingOut = () => {
        dispatch(logoutUser())
        navigation('/')
    }

    if (!user) {
        return null
    }

    return (
        <div>
            <Link to={'/users'}>Users</Link>
            <Link to={'/'}>Blogs</Link>
            <span>{user.name} logged in </span>
            <button onClick={handleSingOut}>Logout</button>
        </div>
    )
}

export default Menu