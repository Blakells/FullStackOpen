import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const {parts} = course
  const nums = parts.map(part => part.exercises)
  function add(total, num) {
    console.log(total, num)
    return total + num
  }

  const sum = nums.reduce(add, 0)
  return(
    <p><strong>Total Number of Exercises {sum}</strong></p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  const {parts} = course
  return (
    <div>
      {parts.map(part => <Part key ={part.id} part={part} />)}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course;