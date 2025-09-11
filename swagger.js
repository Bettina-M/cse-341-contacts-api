const swaggerAutogen = require('swagger-autogen')

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for contacts service',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger-output.json'; 
const endpointsFiles = ['./app.js'];   

swaggerAutogen(outputFile, endpointsFiles, doc);