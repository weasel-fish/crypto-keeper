import express from 'express'
require('dotenv').config()
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors({
    origin: process.env.FRONTEND_URL
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, () => {
    console.log(`Hello I am running on port ${port}`)
})

app.get('/', db.displayHome) // Not used by frontend
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById) // Not used by frontend
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser) // Not used by frontend
app.delete('/users/:id', db.deleteUser)
app.get('/user_wallets/:id', db.getUserWallets) // Not used by frontend
app.get('/user_wallet/:user_id/:currency_id', db.getUserWallet)
app.post('/user_wallets', db.createUserWallet)
app.put('/user_wallets/:id', db.updateUserWallet)
app.delete('/user_wallets/:id', db.deleteUserWallet) // Not used by frontend