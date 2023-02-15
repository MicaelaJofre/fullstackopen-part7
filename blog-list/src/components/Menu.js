import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

import { Button, Nav, Navbar } from 'react-bootstrap'

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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                        <Link to={'/users'}>Users</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to={'/'}>Blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <span>{user.name} logged in </span>
                        <Button variant="warning" onClick={handleSingOut}>Logout</Button>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu