import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>Half Stack Application Development</h1>
    </div>
  )
}

const Part = ({part, number}) => {
  return (
    <div>
      <p>{part} - {number}</p>
    </div>
  )
}


const Total = ({total}) => {
  return (
    <div>
      <p>Number of exercises: {total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
   {
    name: 'Using props to pass data',
    exercises: 7
  },
   {
    name: 'State of a component',
    exercises: 14
  }
]

  const Content = (props) => {
    return (
    <div>
      <Part part= {parts[0].name} number= {parts[0].exercises}/>
      <Part part= {parts[1].name} number= {parts[1].exercises}/>
      <Part part={parts[2].name} number= {parts[2].exercises}/>
    </div>
    )
  }

  return (
    <div>
      <Header/>
      <Content/>
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))