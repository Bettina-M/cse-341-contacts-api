const express = require("express")
const app = express()
const port = 8080
const routes = require('./routes/contacts')

app.get('/', (req, res) =>{
    res.send('Hello World!');
})
app.use(express.json())
app.use('/contacts', routes)


app.listen(port, ()=>{
    
    console.log(`App Listening at http://localhost:${port}`)
})