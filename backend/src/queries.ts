import { Request, Response, NextFunction } from 'express'

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'kyleermentrout',
  host: 'localhost',
  database: 'crypto_keeper_dev',
//   password: 'password',
  port: 5432
})

const displayHome = (req: Request, res: Response) => {
  res.status(200).json('Hello and welcome to the Crypto Keeper server')
}

const getUsers = (req: Request, res: Response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error: Error, result: any) => {
        if (error) {
            throw error
        }
        let rows = result.rows
        res.status(200).json(rows)
    })
}

const getUserById = (req:Request, res:Response) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error: Error, result: any) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows)
  })
}

const createUser = (req:Request, res:Response) => {
  const { name, email } = req.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error: Error, result: any) => {
    if(error) {
      throw error //Shuts down server, revisit
    }
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error: Error, result: any) => {
      if(error) {
        throw error //Shuts down server, revisit
      }
      res.status(201).json(result.rows[0])
    })
    
  })
}

const updateUser = (req:Request, res:Response) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error: Error, results: any) => {
      if (error) {
        throw error
      }
      pool.query('SELECT * FROM users WHERE id = $1', [id], (error: Error, result: any) => {
        if(error) {
          throw error //Shuts down server, revisit
        }
        let customResponse = { message: 'Updated user.', body: result.rows[0]}
        res.status(201).json(customResponse)
      })
    }
  )
}

const deleteUser = (req:Request, res:Response) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error: Error, result: any) => {
    if (error) {
      throw error
    }

    res.status(200).send('User deleted successfully.')
  })
}

module.exports = {
  getUsers,
  displayHome,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}