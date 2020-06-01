import React, {useState, useImperativeHandle} from 'react'
import {Menu, Button} from 'semantic-ui-react'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : '' }
    const showWhenVisible = {display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <Menu>
        <Menu.Item style={hideWhenVisible}>
            <Button onClick={toggleVisibility}>
                {props.buttonLabel}
            </Button>
        </Menu.Item>
        <Menu.Item style={showWhenVisible}>
            {props.children}
            <Button onClick={toggleVisibility}>cancel</Button>
        </Menu.Item>
        </Menu>
    )
})

export default Togglable