import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Total = (props) =>{
  return (
    <div>
    <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
    </div>
  )
}

const App = () => {

  return (
  <div>
    <Header course='Half Stack Application Development'/>
    <Content part='Fundamentals of React' exercise={10}/>
    <Content part='Using props to pass data' exercise={7}/>
    <Content part='State of a component' exercise={14}/>
    <Total exercise1={10} exercise2={7} exercise3={14}/>
  </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

