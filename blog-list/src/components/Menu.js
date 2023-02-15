import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

import { Button, Container, Nav, Navbar } from 'react-bootstrap'

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
            <Container fluid>
                <Navbar.Brand href="#">
                    <span className='fw-bold text-decoration-none text-white' >{user.name} logged in!</span>
                </Navbar.Brand>
                <Navbar.Brand href="#">
                    <Button className='fw-bold btn-sm hover-overlay' variant="warning" onClick={handleSingOut}>Logout</Button>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span">
                            <Link className='fw-bold fs-6 text-decoration-none text-white' to={'/users'}>Users</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link className='fw-bold fs-6 text-decoration-none text-white' to={'/'}>Blogs</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu