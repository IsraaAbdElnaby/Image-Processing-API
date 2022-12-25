import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'path';
import {getDirectory} from '../utils/utils';

// create a request object
const request = supertest(app)

const imgsDirectory = getDirectory();


describe('Test endpoint response', () => {
  const validFile = "fjord";

  beforeAll(()=> {
    const resizedImg = path.join(imgsDirectory, 'thumbnail');
    if(fs.existsSync(resizedImg)) {
      fs.rmdirSync(resizedImg, {recursive: true});
    }
  })

  it('test app endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcom to Image Prossesing App');
  });

  it('test API endpoint with no parameters', async () => {
    const response = await request.get('/image');
    expect(response.status).toBe(400);
  });

  it('test API endpoint with invalid filename', async () => {
    const response = await request.get('/image').query({ imgFile: 'invalid'});
    expect(response.status).toBe(404);
    expect(fs.existsSync(path.resolve(__dirname, '../images/thumbnail'))).toBeFalsy();
  });

  it('test API endpoint with valid filename and valid height', async () => {
    const response = await request.get('/image').query({ imgFile: validFile, height: 200});
    const outPath = path.join(path.resolve(__dirname, '../images/thumbnail'), `${validFile}-height200.jpg`)
    expect(response.status).toBe(200);
    expect(fs.existsSync(path.resolve(__dirname, '../images/thumbnail'))).toBeTruthy();
    expect(fs.existsSync(outPath)).toBeTruthy();
  });

  it('test API endpoint with valid filename and invalid height', async () => {
    const response = await request.get('/image').query({ imgFile: validFile, height: 'ghgh'});
    const outPath = path.join(path.resolve(__dirname, '../images/thumbnail'), `${validFile}-height200.jpg`)
    expect(response.status).toBe(400);
    expect(fs.existsSync(path.resolve(__dirname, '../images/thumbnail'))).toBeFalsy();
  });

  it('test API endpoint with valid filename and valid width', async () => {
    const response = await request.get('/image').query({ imgFile: validFile, width: 200});
    const outPath = path.join(path.resolve(__dirname, '../images/thumbnail'), `${validFile}-width200.jpg`)
    expect(response.status).toBe(200);
    expect(fs.existsSync(path.resolve(__dirname, '../images/thumbnail'))).toBeTruthy();
    expect(fs.existsSync(outPath)).toBeTruthy();
  });

  it('test API endpoint with valid filename and invalid width', async () => {
    const response = await request.get('/image').query({ imgFile: validFile, width: 'ghgh'});
    const outPath = path.join(path.resolve(__dirname, '../images/thumbnail'), `${validFile}-width200.jpg`)
    expect(response.status).toBe(400);
    expect(fs.existsSync(path.resolve(__dirname, '../images/thumbnail'))).toBeFalsy();
  }); 

})
