import loginService from '../services/login'
import blogService from '../services/blogs'
import {setNotification} from './notificationReducer'

const BLOG_USER_KEY = 'blogUser'

export const tryLogin = (creds) => {
    return async dispatch => {
        try {
            const user = await loginService.login(creds)
            dispatch({
                type:'LOGIN',
                data: user
            })
            dispatch(setNotification(`${user.name} logged in`, 3))
            storeToken(user)
        } catch (error) {
               dispatch(setNotification('login failed', 3))
        }
    }
}

export const tryTokenLogin = () => {
    return async dispatch => {
        const loggedUser = window.localStorage.getItem(BLOG_USER_KEY)
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            storeToken(user)
            dispatch({
                type: 'LOGIN',
                data: user
            })
        }
    }
}

export const logout = () => {
    window.localStorage.removeItem(BLOG_USER_KEY)
    return {
        type: 'LOGOUT'
    }
}

const storeToken = (user) => {
    window.localStorage.setItem(BLOG_USER_KEY, JSON.stringify(user))
    blogService.setToken(user.token)
}

const reducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export default reducer