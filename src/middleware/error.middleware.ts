import { Request, Response, NextFunction } from 'express'
import Error from '../interfaces/error.interface'

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = error.status || 500
  const errorMessage = error.message || 'Whoops!! Something went wrong'
  res.status(errorStatus).json({ errorStatus, errorMessage })
}

export default errorMiddleware
