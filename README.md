# Image-Processing-API

### 1. Install all dependencies

`npm install`

### 2. Build

`npm run build`

This command will build the typeScript code into JavaScript and save them in the `./build` folder.

### 3. Start the Server

`npm start`

This command will start the server running on port `3000`.

### Endpoints 
 1- ### GET / 
    Main Endpoint, Returns welcome message in the frontend
    example: `http://127.0.0.1:3000`
    
 2- ### GET /api
    API Endpoint, Returns welcome message in the frontend
    example: `http://127.0.0.1:3000/api`
    
 3- ### GET /api/images
    Takes image filename as query parameter and returns the image
    Query Parameter: `imgFile`
    example: `localhost:3000/api/images/?imgFile=fjord`
