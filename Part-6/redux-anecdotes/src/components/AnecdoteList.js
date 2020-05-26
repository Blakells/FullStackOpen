import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
const dispatch = useDispatch()

const vote = (anecdote) => {
  console.log('vote', anecdote.content)
  dispatch(addVote(anecdote.id))
  dispatch(setNotification(`voted for: "${anecdote.content}"`))
  setTimeout(() => {
    dispatch(deleteNotification())
  }, 5000)
}

const sorted = anecdotes.sort((a, b) => {
  return b.votes - a.votes
})
  return (
    <div>
      {sorted.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList