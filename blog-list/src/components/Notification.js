import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'

const Notification = () => {

    const notification = useSelector(state => state.notification)

    if (notification === null) return null

    return (
        <div className="container">
            {(
                notification.status === 'message'
                    ? <Alert className='text-uppercase fw-bold' variant="success">
                        {notification.message}
                    </Alert>
                    : notification.status === 'error'
                        ? <Alert className='text-uppercase fw-bold' variant="danger">
                            {notification.message}
                        </Alert>
                        : null
            )}
        </div>
    )
}

export default Notification

