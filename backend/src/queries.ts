import { Request, Response, NextFunction } from 'express'

const Pool = require('pg').Pool

const pool = new Pool({
  user: 'kyleermentrout',
  host: 'localhost',
  database: 'crypto_keeper_dev',
//   password: 'password',
  port: 5432,
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

module.exports = {getUsers, displayHome, getUserById}