# Image-Processing-API

### 1. Install all dependencies

`npm install`

### 2. Build

`npm run build`

This command will build the typeScript code into JavaScript and save them in the `./build` folder.

### 3. Start the Server

`npm start`

This command will start the server running on port `3000`.

### 4. Testing

`npm test`

### Endpoints 
  #### GET / 
    Main Endpoint, Returns welcome message in the frontend
    
    example: `http://127.0.0.1:3000`
    
  #### GET /api
    API Endpoint, Returns welcome message in the frontend
    
    example: `http://127.0.0.1:3000/api`
    
  #### GET /api/images
    Takes image filename as query parameter and returns the image
    
    Query Parameter: `imgFile`
    
    example: `localhost:3000/api/images/?imgFile=fjord`
    
  #### GET /api/images/?imgFile=<image_name>&width=<width>&height=<height>`

    URL Params: `height` and `width` - the height or width of the image in pixels
 
    Query Param: `imgFile` - the specific image you are requesting.

    For example: `localhost:3000/api/images/?imgFile=fjord&width=300&height=300`
    
### Available Test Images
 
    1. `encenadaport`
    2. `fjord`
    3. `icelandwaterfall`
    4. `palmtunnel`
    5. `santamonica`
    
 
