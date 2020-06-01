import React from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import {logout} from '../reducers/loginReducer'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


const Navigation = (props) => {
    const handleLogout = () => {
      props.logout()
      props.history.push('/')
    }

    const goto = (path) => props.history.push(path)

    return (
        <Menu>
      <Menu.Item onClick={() => goto('/')}>blogs</Menu.Item>
      <Menu.Item onClick={() => goto('/users')}>users</Menu.Item>
      <Menu.Item position='right'>
        {props.loggedUser.name} logged in
      </Menu.Item>
      <Menu.Item position='right' onClick={handleLogout}>log out</Menu.Item>
    </Menu>
    )
}
const mapStateToProps = (state) => {
    return {
      loggedUser: state.loggedUser
    }
  }
  
  const mapDispatchToProps = { logout }
  
  Navigation.propTypes = {
    loggedUser: PropTypes.object,
    logout: PropTypes.func.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))