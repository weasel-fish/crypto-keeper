import { Request, Response } from 'express'

let pg = require('pg');
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}

let connString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:localpostgresport/yourlocaldbname';
const { Pool } = require('pg');

const pool = new Pool({
  connectionString : connString
});

const displayHome = (req: Request, res: Response) => {
  res.status(200).json('Hello and welcome to the Crypto Keeper server')
}

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

const getUserById = (req:Request, res:Response) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error: Error, result: any) => {
    if (error) {
      res.status(404).json(error)
    } else {
      res.status(200).json(result.rows)
    }
  })
}

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

const updateUser = (req:Request, res:Response) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error: Error, results: any) => {
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

const deleteUser = (req:Request, res:Response) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error: Error, result: any) => {
    if (error) {
      res.status(404).json(error)
    } else {
      res.status(200).send('User deleted successfully.')
    }
  })
}

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
  getUsers,
  displayHome,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserWallet,
  getUserWallets,
  createUserWallet,
  updateUserWallet,
  deleteUserWallet
}