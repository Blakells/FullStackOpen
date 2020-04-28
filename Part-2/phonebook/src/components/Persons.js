import React from 'react'
import personService from '../services/persons'

const Persons = ({ persons, setPersons }) => {
  const deletePerson = personToDelete => {
    const {id, name} = personToDelete
    const answer = window.confirm(`Delete ${name}?`)
    if (answer) {
      personService
      .remove(id)
      .then(data => {
        setPersons(persons.filter(n => n.id !== id))
      })
    }
    console.log(answer, id)
  }
return (
<div>
  <ul>
    {persons.map((person, i) => (
      <li key={i}>{person.name} {person.number}
      <button onClick={() => deletePerson(person)}>delete</button>
      </li>
    ))}
  </ul>
</div>
)
}

export default Persons