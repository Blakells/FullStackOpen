import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/errorMessage'
const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const hook = () => {
    personService
    .getAll()
    .then(returnPeople => {
      console.log('rendered correctly')
      setPersons(returnPeople)
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
    console.log(foundName)
    if (foundName) {
      const replace = window.confirm(`${foundName.name} is already added, replace the old number?`)
      if (replace){
        foundName.number = newNumber
        personService
      .update(foundName)
      .then (people => {
        console.log(people)
        setPersons(persons.map(person => person.id !== people.id ? person : people))
      })
      .catch(err => {
        setErrorMessage(`'${foundName.Name}' was already deleted from the server`)
      })
      setErrorMessage(`Added '${nameObject.name}'`)
      setTimeout(() =>{
        setErrorMessage('')
      }, 5000)
      }
    } else if (nameObject.name.length < 3 || nameObject.number.length < 9) {
      setErrorMessage(`Name is either less than 3 characters or Number is less than 9 characters long`)
      setTimeout(() =>{
        setErrorMessage('')
      }, 5000)
    } else {
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      setErrorMessage(`Added '${nameObject.name}'`)
      setTimeout(() =>{
        setErrorMessage('')
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
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
      <Notification message={errorMessage}/>
      <Filter handleFilterChange={handleFilterChange} />

      <h2>Add a new name/number</h2>

      <PersonForm
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addName={addName}
      />

      <h2>Numbers</h2>

      <Persons persons={filtered} setPersons={setPersons}/>

    </div>
  )
}

export default App