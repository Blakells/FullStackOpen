import anecdoteService from '../services/anecdotes'

export const addVote = (anecdote) => {
  return async dispatch => {
    const oldAnecdote = await anecdoteService.getOne(anecdote)
    const updatedAnecdote = {
      ...oldAnecdote,
      votes: oldAnecdote.votes + 1
    }
    await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(anecdote)
    dispatch({
    type: 'ADD_ANECDOTE',
    data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToUpdate = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(s => s.id !== id ? s : changedAnecdote)
      case 'INIT_ANECDOTES':
        return action.data
      case 'ADD_ANECDOTE':
        return [...state, action.data]
    default:
    return state
  }
}

export default reducer