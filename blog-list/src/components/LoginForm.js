import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks/form'

const LoginForm = ({ createUser }) => {
    const username = useField('username')
    const password = useField('password')

    LoginForm.propTypes = {
        createUser: PropTypes.func.isRequired
    }

    const handleLogin = (event) => {
        event.preventDefault()

        createUser({
            username: username.value,
            password: password.value
        })
    }


    return (
        <Togglable buttonLabel='Show login'>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input {...username} />
                </div>
                <div>
                    password
                    <input {...password} />
                </div>
                <button type="submit" id='login-button'>login</button>
            </form>
        </Togglable>

    )
}

export default LoginForm