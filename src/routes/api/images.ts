import express, { Request, Response, Router } from 'express'
import { getImgPath } from '../../utils/utils'
import fs from 'fs'

const images = Router()
images.get('/', async (req: Request, res: Response): Promise<void> => {
  const { imgFile, width, height } = req.query
  if (imgFile) {
    const imgPath = await getImgPath(
      imgFile as string,
      parseInt(width as string),
      parseInt(height as string)
    )
    if (fs.existsSync(imgPath)) {
      res.sendFile(imgPath)
    } else {
      res.status(400)
      res.send('Image path is incorrect')
    }
  } else {
    res.status(400)
    res.send('Please provide a valid filename as a query parameter')
  }
})

export default images
