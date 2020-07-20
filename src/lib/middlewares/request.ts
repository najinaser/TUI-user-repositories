import { Request, Response, NextFunction } from 'express'

const header = (req:Request, res:Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json')

  // header acceps key should be JSON
  if (!req.accepts('json')) {
    res.status(406).send(
      JSON.stringify({
        status: 406,
        Message: 'Header accepts only JSON format, please check the accept key in the request header'
      })
    )
  }
  next()
}

export {
  header
}
