import userService from '../services/users'

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type:'INIT_USERS',
            data: users
        })
    }
}

export const addUser = (user) => {
    return async dispatch => {
        const newUser = userService.createUser(user)
        dispatch({
            type: 'ADD_USER',
            data: newUser
        })
    }
}
const reducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_USERS':
            return action.data
        case 'ADD_USER':
            return state.concat(action.data)
        default:
            return state
    }
}

export default reducer