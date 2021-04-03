import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InputForm from './components/InputForm'
import Input from './components/Input'
import ContactDisplay from './components/ContactDisplay'
import Notification from './components/Notification'
import {getContacts, postContact, alterContact, deleteContact} from './components/api'



const App = () => {

  const dbPath = `http://localhost:3001`

  useEffect(() => {
    getContacts(setPersons, dbPath)
  }, [])

  const [ persons, setPersons ] = useState([]) 
  const [ filterText, setFilterText ] = useState('')
  const [ message, setMessageText ] = useState(null)
  const [ messageType, setType ] = useState(null)

  const setMessage = (message, type) => {
    setMessageText(message)
    setType(type)
  }
  const handleFilterChange = (event) => setFilterText(event.target.value)

  const onFilterChange = (text) => {
    text = text.toLowerCase
    if(filterText !== ''){
      return(persons.filter(person => 
        (person.name.toLowerCase().includes(text) || person.number.toLowerCase().includes(text)))
      )
    } else return(persons)
  }

  const deletePerson = (id) => {
    let newContactList = persons.filter(person => Number(person.id) !== Number(id))
    setPersons(newContactList)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Input name='Filter Phonebook' value={filterText} onChange={handleFilterChange} />
      <h3>Add New Contact</h3>
      <InputForm persons={persons} setPersons={setPersons} dbPath={dbPath} deletePerson={deletePerson} setMessage={setMessage} />
      <h3>Numbers</h3>
      <ContactDisplay dbPath={dbPath} deletePerson={deletePerson} contacts={onFilterChange(filterText)} setMessage={setMessage} />
    </div>
  )
}

export default App;
