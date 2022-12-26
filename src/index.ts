import express, { Application, Request, Response } from 'express';
import routes from './routes';
import morgan from 'morgan'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
// add routing for /api path
app.use('/api', routes)

app.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    res.send('Welcom to Image Prossesing App..... use api/images?filename={yourfilename} to get started');
  }
);

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
