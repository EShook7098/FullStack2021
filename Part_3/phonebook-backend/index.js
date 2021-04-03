
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())

//SET MORGAN OUTPUT
morgan.token('data', (request, response) => {
  if(request.method === 'POST') {
    console.log(request.body)
    return JSON.stringify(request.body)
  }
  return null
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.use(cors())


let contacts = [{
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "33",
    "number": "333",
    "id": 5
  }
]

const generateID = () => {
  const maxID = contacts.length > 0 
    ? Math.max(...contacts.map(c => c.id))
    : 0
  return maxID + 1
}

const generateError = (errArr) => {
  if(errArr.length === 1)
    return(errArr[0])
  let msg = '| '
  errArr.forEach(error => {
    msg += error + ' | '
  } )
  return msg
}

app.get('/', (request, response) => {
  response.send('<h1>Test Server Succesfully Contacted</h1>')
})

app.get('/info', (request, response) => {
  const template = `<p>Phonebook has info for ${contacts.length} people</p>
                    <p>${new Date()}`
  response.send(template)
})

app.get('/api/contacts/:id', (request, response) => {
  const id = Number(request.params.id)
  const contact = contacts.find(contact => contact.id === id)

  if(contact) {
    response.json(contact)
  } else {
    console.log("FUk")
    response.status(404).end()
  }
})

app.get('/api/contacts', (request, response) => {
  response.json(contacts)
})

app.delete('/api/contacts/:id', (request, response) => {
  const id = Number(request.params.id)
  contacts = contacts.filter(contact => contact.id !== id)

  response.status(204).end()
})

app.post('/api/contacts', (request, response) => {
  let body = request.body
  let err = false
  let errArr = []

  if(!body.name) {
    err = true
    errArr.push('Name is missing')
  }
  if(!body.number) {
    err = true
    errArr.push('Number is missing')
  }
  if(err)
    return response.status(400).json({ error: generateError(errArr) })
  //Does body.name already exist in contacts
  if(!(contacts.findIndex(contact => contact.name.toLowerCase() === body.name.toLowerCase()) === -1  ? true : false))
    return response.status(400).json({ error: "Name already exists in database" })


  const contact = {
    id: generateID(),
    name: body.name,
    number: body.number,
    date: new Date()
  }

  contacts = contacts.concat(contact)
  response.json(contact)
})

const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})