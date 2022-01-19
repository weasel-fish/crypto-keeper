import { Request, Response } from 'express'

const displayHome = (req: Request, res: Response) => {
    res.status(200).json('Hello and welcome to the Crypto Keeper server')
}


module.exports = {
    displayHome
  }