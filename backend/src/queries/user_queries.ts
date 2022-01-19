import { pool } from '../db'
import { Request, Response } from 'express'


// Returns an array of all users
const getUsers = (req: Request, res: Response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error: Error, result: any) => {
        if (error) {
          res.status(404).json(error)
        } else {
          let rows = result.rows
          res.status(200).json(rows)
        }
    })
}

// Returns a single user as specified by their id
const getUserById = (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error: Error, result: any) => {
      if (error) {
        res.status(404).json(error)
      } else {
        res.status(200).json(result.rows[0])
      }
    })
  }
  
  // Creates a new user and returns the newly created user object
  const createUser = (req:Request, res:Response) => {
    const { name, email } = req.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error: Error, result: any) => {
      if(error) {
        res.status(422).json(error)
      } else {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error: Error, result: any) => {
          if(error) {
            res.status(404).json(error)
          } else {
            res.status(201).json(result.rows[0])
          }
        })
      }
      
    })
  }
  
  // Updates a user's name or email and returns the newly updated user object
  const updateUser = (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error: Error, results: any) => {
        if (error) {
          res.status(422).json(error)
        } else {
          pool.query('SELECT * FROM users WHERE id = $1', [id], (error: Error, result: any) => {
            if(error) {
              res.status(404).json(error)
            } else {
              let customResponse = { message: 'Updated user.', body: result.rows[0]}
              res.status(201).json(customResponse)
            }
          })
        }
      }
    )
  }
  
  // Deletes a user as specified by their id, then deletes any wallets associated with that id
  const deleteUser = (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error: Error, result: any) => {
      if (error) {
        res.status(404).json(error)
      } else {
        pool.query('DELETE FROM user_wallets WHERE user_id = $1', [id], (error: Error, result: any) => {
          if(error) {
            res.status(404).json(error)
          } else {
            res.status(200).send('User deleted successfully.')
          }
        })
      }
    })
  }
  

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  }