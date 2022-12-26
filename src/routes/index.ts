import express, { Request, Response } from 'express'
import images from './api/images'

const routes = express.Router()

routes.use('/images', images)
routes.get('/', (req: Request, res: Response): void => {
  res.send(
    'Welcom to Image Prossesing App..... use api/images?filename={yourfilename} to get started'
  )
})
export default routes
