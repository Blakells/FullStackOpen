import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'
const store = createStore(counterReducer)
const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button onClick = {() => store.dispatch({ type: 'INCREMENT'})}>plus</button>
      <button onClick = {() => store.dispatch({ type: 'DECREMENT'})}>minus</button>
      <button onClick = {() => store.dispatch({ type: 'RESET'})}>zero</button>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App