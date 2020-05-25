import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import { createNotification , clearNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const timer = () => {
      return (dispatch) => {
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
    }}

    const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote.id))
    dispatch(createNotification(`you voted "${anecdote.content}"`))
    dispatch(timer())
  }

  const sorter = anecdotes.sort((a,b) => {
    return b.votes - a.votes
  })
    return (
        <div>
      {sorter.map(anecdote =>
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