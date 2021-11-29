import express, { Request, Response, NextFunction } from 'express'
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:4000'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, () => {
    console.log(`Hello I am running on port ${port}`)
})

app.get('/', db.displayHome)
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)