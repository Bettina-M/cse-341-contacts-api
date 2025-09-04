const {MongoClient} = require('mongodb');
const dotenv = require('dotenv')

dotenv.config()

const client = new MongoClient(process.env.MONGO_URI)

let db;

async function dbConnect(){
    if(!db){
        await client.connect();
        db = client.db('project1');
        console.log('Connected to MongoDB')
    }
    return db
}

module.exports = {dbConnect}