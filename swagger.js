const swaggerAutogen = require('swagger-autogen')

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for contacts service',
  },
  host: 'https://cse-341-contacts-api.onrender.com/',
  schemes: ['https'],
};

const outputFile = './swagger-output.json'; 
const endpointsFiles = ['./app.js'];   

swaggerAutogen(outputFile, endpointsFiles, doc);