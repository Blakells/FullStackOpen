import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

const vote = (anecdote) => {
  console.log('vote', anecdote.content)
  props.addVote(anecdote)
  props.setNotification(`voted for: "${anecdote.content}"`, 3)
}

const sorted = props.anecdotes.sort((a, b) => {
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

const mapStateToProps = (state) => {
return {
  anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
}
}
const mapDispatchToProps = {
  addVote, setNotification
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdoteList