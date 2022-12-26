import express, { Request, Response, Router } from 'express'
import { getImgPath } from '../../utils/utils'
import fs from 'fs'

const images = Router()
images.get('/', async (req: Request, res: Response): Promise<void> => {
  const { imgFile, width, height } = req.query;
  const widthVal:number = parseInt(width as string);
  const heightVal:number = parseInt(height as string);
  try {
  if (imgFile) {
    try{ 
    const imgPath = 
      await getImgPath(
      imgFile as string,
      widthVal,
      heightVal
    )

    if (fs.existsSync(imgPath)) {
      res.sendFile(imgPath)
    } else {
      res.status(400)
      res.send('Image path is incorrect')
    }
  } catch(error) {
    throw new Error('Error occurred while processing image')
  }
  } else {
    res.status(400)
    res.send('Please provide a valid filename as a query parameter')
  }
}
catch (error) {
  throw new Error(`Error something went wrong`)
}

})

export default images
