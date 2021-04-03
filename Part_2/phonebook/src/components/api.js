import React from 'react'
import axios from 'axios'

const getContacts = (setPersons, dbPath) => {
  axios
    .get(`${dbPath}/persons`)
    .then(response => {
      setPersons(response.data)
      
      console.log(`${dbPath}/persons`, response)
    })
    .catch(err => {
      console.log(err)
      console.log(`${dbPath}/persons`)
    })
}

const postContact = (dbPath, contactObject, setMessage, setPersons, persons) => {
  axios
    .post(`${dbPath}/persons`, contactObject)
    .then(res => {
      console.log(res)
      setMessage(`${contactObject.name} successfully added!`, `success`)
      setPersons(persons.concat(res.data))
    })
    .catch(res => {
      console.log("POST request failed.\n", res)
      setMessage(`${contactObject.name} could not be added.`, `error`)
    })
}

const alterContact = (id, dbPath, contactObject, deletePerson, setMessage) => {
  axios
    .put(`${dbPath}/persons/${id}`, contactObject)
    .then(response => {
      console.log(response)
      setMessage(`${contactObject.name} successfully altered!`, `success`)
    })
    .catch (response => {
      console.log("POST request failed.\n", response)
      deletePerson(id)
      setMessage(`ERROR, contact no longer exists.`, `error`)
    })
}

const deleteContact = (id, name, dbPath, onDeletion, setMessage) => {
  axios
    .delete(`${dbPath}/persons/${id}`)
    .then(res => {
      setMessage(`${name} was deleted.`, 'success')
    })
    .catch(result => {
      setMessage(`ERROR: Could not delete contact ${name}.`, `error`)
    })

    onDeletion(id)
}

export {getContacts, postContact, alterContact, deleteContact}