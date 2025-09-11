const express = require("express")
const app = express()
const port = 8080
const contactRoutes = require('./routes/contacts')
const bodyParser = require("body-parser")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json')
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));

app.use('/contacts', contactRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) =>{
    res.send('Hello World!');
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

//
app.listen(port, ()=>{
    
    console.log(`App Listening at http://localhost:${port}`)
})