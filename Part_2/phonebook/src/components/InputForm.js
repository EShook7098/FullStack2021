import React, { useState } from 'react'
import Input from './Input'
import axios from 'axios'
import {getContacts, postContact, alterContact, deleteContact} from './api'


const InputForm = ({persons, setPersons, dbPath, deletePerson, setMessage}) => {

  const [ newName, setName ] = useState('')
  const [ newNumber, setNumber ]  = useState('')

  const handleNameChange = (event) => setName(event.target.value)
  const handleNumChange  = (event) => setNumber(event.target.value)

  const addContact = (event) => {
    event.preventDefault()

    const isUnique = (arr, newValue, attr) => arr.findIndex(elem => elem[attr].toLowerCase() === newValue.toLowerCase()) === -1  ? true : false

    if(!isUnique(persons, newName, 'name')){
      let person = persons.find(person => person.name === newName)
      if(newNumber !== person.number){
        let newContactObject = {...person, number: newNumber}
        alterContact(person.id, dbPath, newContactObject, deletePerson, setMessage)
        setPersons(persons.map(personMapElem => personMapElem.name === person.name ? newContactObject : personMapElem))
      }
      return
    }
    else if(!isUnique(persons, newNumber, 'number')) {
      setMessage(`The number ${newNumber} is already in the phonebook.`, 'error')
      return
    }

    const newPerson = { name: newName, number: newNumber }

    postContact(dbPath, newPerson, setMessage, setPersons, persons)
    setName('')
    setNumber('')
  }

  return (
    <div>
      <form onSubmit={addContact}>
        <div>
          <Input name='Name' value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <Input name='Phone Number' value={newNumber} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default InputForm