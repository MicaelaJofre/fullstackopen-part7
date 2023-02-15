import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'


const Togglable = ({ children, buttonLabel, closeForm }) => {

    const [visible, setVisible] = useState(false)

    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }


    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    useEffect(() => {
        if (closeForm) {
            setVisible(false)
        }
    }, [closeForm])


    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant="warning" onClick={() => setVisible(true)}>{buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <Button variant="warning" onClick={() => setVisible(false)}>Cancel</Button>
            </div>
        </div>

    )
}

export default Togglable