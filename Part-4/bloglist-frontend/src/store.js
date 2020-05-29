import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notifications: notificationReducer,
    login: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store