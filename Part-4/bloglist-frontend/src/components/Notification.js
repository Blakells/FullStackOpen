import React from 'react'

const Notification = ({ message, clas }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={clas}>
        {message}
        </div>
    )
}

export default Notification