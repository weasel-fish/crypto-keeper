import express from 'express'
require('dotenv').config()
const bodyParser = require('body-parser')
const userQs = require('./queries/user_queries')
const walletQs = require('./queries/user_wallet_queries')
const welcome = require('./queries/welcome')
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

app.get('/', welcome.displayHome) // Not used by frontend
app.get('/users', userQs.getUsers)
app.get('/users/:id', userQs.getUserById) // Not used by frontend
app.post('/users', userQs.createUser)
app.put('/users/:id', userQs.updateUser) // Not used by frontend
app.delete('/users/:id', userQs.deleteUser)
app.get('/user_wallets/:id', walletQs.getUserWallets) // Not used by frontend
app.get('/user_wallet/:user_id/:currency_id', walletQs.getUserWallet)
app.post('/user_wallets', walletQs.createUserWallet)
app.put('/user_wallets/:id', walletQs.updateUserWallet)
app.delete('/user_wallets/:id', walletQs.deleteUserWallet) // Not used by frontend