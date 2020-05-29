export const setNotification = (text, seconds) => {
    return async dispatch => {
      const timer = setTimeout(() => {
        dispatch(deleteNotification())
      }, seconds * 1000)
      dispatch({
        type: 'SET_NOTIFICATION',
        data: {text, timer}
      })
    }
  }
  
  export const deleteNotification = () => {
    return {
      type: 'DELETE_NOTIFICATION',
    }
  }
  
  const notificationReducer = (state = {text : '', timer: null}, action) => {
    //console.log('state:',state)
    //console.log('action:',action)
    switch(action.type) {
      case 'SET_NOTIFICATION':
        if (state.timer !== null) {
          clearTimeout(state.timer)
        }
        return { text: action.data.text, timer: action.data.timer}
      case 'DELETE_NOTIFICATION':
        return {text: '', timer: null}
      default:
        return state
    }
  }
  export default notificationReducer