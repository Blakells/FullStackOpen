import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from '../node_modules/axios'

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(res => {
      console.log('rendered correctly')
      setPersons(res.data)
    })
  }
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    let foundName = persons.find(({ name }) => name === newName)
    let foundNumber = persons.find(({ number }) => number === newNumber)
    if (foundName || foundNumber) {
      alert(`${newName} or ${newNumber} is already added to the phonebook!`)
    } else {
      setPersons(persons.concat({
        name: nameObject.name,
        number: nameObject.number
      }))
    setNewName('')
    setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  
  const filtered = persons.filter((person) => {
      return person.name.search(new RegExp(newFilter, 'i')) >=0
  })

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} />

      <h2>Add a new name/number</h2>

      <PersonForm
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addName={addName}
      />

      <h2>Numbers</h2>

      <Persons persons={filtered} />

    </div>
  )
}

export default App