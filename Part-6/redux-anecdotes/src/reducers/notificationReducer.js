export const createNotification = (text) => {
  return {
    type: "CREATE_NOTIFICATION",
    data: {
      text
    }
  }
}

export const clearNotification = (id) => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}
const initialState = ['']
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      const newState = action.data.text
      state = newState
      return state
    case 'CLEAR_NOTIFICATION':
      const cleared = ''
      state = cleared
      return state
    default:
      return state
  }
}

export default notificationReducer