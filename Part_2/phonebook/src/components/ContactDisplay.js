import React, { useEffect } from 'react'
import axios from 'axios'
import {getContacts, postContact, alterContact, deleteContact} from './api'


const ContactDisplay = ({contacts, dbPath, deletePerson, setMessage}) => {
  if (contacts.length === 0) {
    return(
      <p>...</p>
    )
  } else {
    return(
      contacts.map((contact, i) => <div key={i}>{contact.name} {contact.number}<button type='button' onClick={() => deleteContact(contact.id, contact.name, dbPath, deletePerson, setMessage)}>delete</button></div> )
    )
  }
}

export default ContactDisplay