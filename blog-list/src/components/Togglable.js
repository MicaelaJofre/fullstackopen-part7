import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Stack } from 'react-bootstrap'


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
            <div style={hideWhenVisible} className='pb-4'>
                <Button className='fw-bold hover-overlay' variant="warning" onClick={() => setVisible(true)}>{buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <Stack className="col-md-5 mb-2">
                    <Button className='fw-bold hover-overlay' variant="warning" onClick={() => setVisible(false)}>Cancel</Button>
                </Stack>
            </div>
        </div>

    )
}

export default Togglable