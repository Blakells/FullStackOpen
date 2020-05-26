
export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data : {
      filter
    }
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      state = action.data.filter
      return state
    default:
      return state
  }
}

export default filterReducer