import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks/form'

import { Button, Form, FormGroup } from 'react-bootstrap'

const LoginForm = ({ createUser }) => {
    const { reset: resetUsername, ...username } = useField('username')
    const { reset: resetPassword, ...password } = useField('password')

    LoginForm.propTypes = {
        createUser: PropTypes.func.isRequired
    }

    const handleLogin = (event) => {
        event.preventDefault()

        createUser({
            username: username.value,
            password: password.value
        })
        resetUsername()
        resetPassword()
    }

    return (
        <Togglable buttonLabel='Show login'>
            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control {...username} />
                    <Form.Label>Password:</Form.Label>
                    <Form.Control {...password} />
                    <Button variant="warning" type="submit" id='login-button'>login</Button>
                </FormGroup>
            </Form>
        </Togglable>

    )
}

export default LoginForm