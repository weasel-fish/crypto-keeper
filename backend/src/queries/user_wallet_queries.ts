import { pool } from '../db'
import { Request, Response } from 'express'

// Returns an array of all wallets associated with a user as specified by their id
const getUserWallets = (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM user_wallets WHERE user_id = $1 ORDER BY id ASC', [id], (error: Error, result: any) => {
      if (error) {
        res.status(404).json(error)
      } else {
        let rows = result.rows
        res.status(200).json(rows)
      }
    })
  }
  // Returns a single wallet, if it exists, as specified by the user's id and the currency id/symbol. If it doesn't exist,
  // returns an empty object
  const getUserWallet = (req:Request, res:Response) => {
    const user_id = req.params.user_id
    const currency_id = req.params.currency_id
  
    pool.query('SELECT * FROM user_wallets WHERE user_id = $1 AND currency_id = $2', [user_id, currency_id], (error: Error, result: any) => {
      if (error) {
        res.status(404).json(error)
      } else {
        let customResult = result.rows[0] ? result.rows[0] : {}
        res.status(200).json(customResult)
      }
    })
  }
  
  // Creates a new wallet associated with a particular user and currency, using the amount and average cost provided by the
  // frontend. Returns the new wallet object
  const createUserWallet = (req:Request, res:Response) => {
    const { user_id, currency_id, amount, avg_cost } = req.body
  
    pool.query('INSERT INTO user_wallets (user_id, currency_id, amount, avg_cost) VALUES ($1, $2, $3, $4)', [user_id, currency_id, amount, avg_cost], (error: Error, result: any) => {
      if(error) {
        res.status(422).json(error)
      } else {
        pool.query('SELECT * FROM user_wallets WHERE user_id = $1 AND currency_id = $2', [user_id, currency_id], (error: Error, result: any) => {
          if(error) {
            res.status(404).json(error)
          } else {
            res.status(201).json(result.rows[0])
          }
        })
      }
    })
  }
  
  // Updates the wallet associated with a particular user and currency, using the new amount and average cost provided by the
  // frontend. Returns the updated wallet object
  function updateUserWallet(req:Request, res:Response) {
    const id = parseInt(req.params.id)
    const { amount, avg_cost } = req.body
    pool.query('UPDATE user_wallets SET amount = $1, avg_cost = $2 WHERE id = $3', [amount, avg_cost, id], (error: Error, results: any) => {
      if (error) {
        res.status(422).json(error)
      } else {
        pool.query('SELECT * FROM user_wallets WHERE id = $1', [id], (error: Error, result: any) => {
          if(error) {
            res.status(404).json(error)
          } else {
            res.status(201).json(result.rows[0])
          }
        })
      }
    })
  }
  
  // Deletes a wallet as specified by the wallet id
  const deleteUserWallet = (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM user_wallets WHERE id = $1', [id], (error: Error, result: any) => {
      if (error) {
        res.status(404).json(error)
      } else {
        res.status(200).send('Wallet deleted successfully.')
      }
    })
  }

  module.exports = {
    getUserWallet,
    getUserWallets,
    createUserWallet,
    updateUserWallet,
    deleteUserWallet
  }