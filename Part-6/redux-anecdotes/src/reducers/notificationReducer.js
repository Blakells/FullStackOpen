export const setNotification = (anecdote) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      content: anecdote
    }
  }
}

export const deleteNotification = (anecdote) => {
  return {
    type: 'DELETE_NOTIFICATION',
    data: {
      content: ''
    }
  }
}

const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      state = action.data.content
      return state
    case 'DELETE_NOTIFICATION':
      state = ''
      return state
    default:
      return state
  }
}
export default notificationReducer