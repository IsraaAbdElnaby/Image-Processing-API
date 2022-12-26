import supertest from 'supertest'
import app from '../index'
import fs from 'fs'
import path from 'path'
import { getDirectory, getImgPath } from '../utils/utils'

// create a request object
const request = supertest(app)

const imgsDirectory = getDirectory()

describe('Test endpoint response', () => {
  const validFile = 'fjord'
  const invalidFile = 'invalid'
  const width = 200
  const height = 200

  beforeAll(() => {
    const resizedImg = path.join(imgsDirectory, 'thumbnail')
    if (fs.existsSync(resizedImg)) {
      fs.rmdirSync(resizedImg, { recursive: true })
    }
  })

  it('test app endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    expect(response.text).toBe(
      'Welcom to Image Prossesing App..... use api/images?filename={yourfilename} to get started'
    )
  })

  it('test API endpoint', async () => {
    const response = await request.get('/api')
    expect(response.status).toBe(200)
    expect(response.text).toBe(
      'Welcom to Image Prossesing App..... use api/images?filename={yourfilename} to get started'
    )
  })

  it('test API endpoint with no parameters', async () => {
    const response = await request.get('/api/images')
    expect(response.status).toBe(400)
    expect(response.text).toBe('Please provide a valid filename as a query parameter')
  })

  it('test API endpoint with invalid filename', async () => {
    // const response = await request.get('/api/images').query({ imgFile: 'invalid'});
    const response = await request.get('/api/images?imgFile=' + invalidFile)
    expect(response.status).toBe(400)
    // expect(fs.existsSync(path.resolve(__dirname, '../images/thumbnail'))).toBeFalsy();
  })

  it('test API endpoint with valid filename and valid height', async () => {
    // const response = await request.get('/api/images').query({ imgFile: validFile, height: 200});
    const response = await request.get(`/api/images?imgFile=${validFile}&height=200`)
    // const outPath = path.join(path.resolve(__dirname, '../images/thumbnail'), `${validFile}-height200.jpg`)
    expect(response.status).toBe(200)
    // expect(fs.existsSync(path.resolve(__dirname, '../images/thumbnail'))).toBeTruthy();
    // expect(fs.existsSync(outPath)).toBeTruthy();
  })

  // it('test API endpoint with valid filename and invalid height', async () => {
  //   // const response = await request.get('/api/images').query({ imgFile: validFile, height: 'ghgh'});
  //   const response = await request.get(`/api/images?imgFile=${validFile}&height='ghgh'`);
  //   // const outPath = path.join(path.resolve(__dirname, '../images/thumbnail'), `${validFile}-height200.jpg`)
  //   expect(response.status).toBe(400);
  //   // expect(fs.existsSync(path.resolve(__dirname, '../images/thumbnail'))).toBeFalsy();
  // });

  it('test API endpoint with valid filename and valid width', async () => {
    const response = await request.get('/api/images').query({ imgFile: validFile, width: 200 })
    // const outPath = path.join(path.resolve(__dirname, '../images/thumbnail'), `${validFile}-width200.jpg`)
    expect(response.status).toBe(200)
    // expect(fs.existsSync(path.resolve(__dirname, '../images/thumbnail'))).toBeTruthy();
    // expect(fs.existsSync(outPath)).toBeTruthy();
  })

  // it('test API endpoint with valid filename and invalid width', async () => {
  //   const response = await request.get('/api/images').query({ imgFile: validFile, width: 'ghgh'});
  //   // const outPath = path.join(path.resolve(__dirname, '../images/thumbnail'), `${validFile}-width200.jpg`)
  //   expect(response.status).toBe(400);
  //   // expect(fs.existsSync(path.resolve(__dirname, '../images/thumbnail'))).toBeFalsy();
  // });

  it('Test resize API', async () => {
    const img = `${validFile}-width${width}-height${height}.jpg`
    expect(await getImgPath(validFile, width, height)).toContain(img)
    expect(fs.existsSync(path.join(await getDirectory(__dirname), 'thumbnail', img))).toBeTruthy()
  })
})
