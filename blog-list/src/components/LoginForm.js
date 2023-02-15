import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks/form'

import { Button, Form, FormGroup, Stack } from 'react-bootstrap'

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
                    <Form.Label className='fw-bold'>Username:</Form.Label>
                    <Form.Control {...username} />
                    <Form.Label className='fw-bold'>Password:</Form.Label>
                    <Form.Control {...password} />
                    <Stack className="col-md-5 mt-2 mb-2">
                        <Button className='fw-bold hover-overlay' variant="warning" type="submit" id='login-button'>login</Button>
                    </Stack>
                </FormGroup>
            </Form>
        </Togglable>

    )
}

export default LoginForm