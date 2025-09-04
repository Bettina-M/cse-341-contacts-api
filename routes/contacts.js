const express = require('express');
const router = express.Router();
const {dbConnect} = require('../database/database');
const { ObjectId } = require('mongodb');

//function for all contacts
router.get("/", async(req, res) =>{
    try{
        const db = await dbConnect()

        const contacts = await db.collection("contacts").find().toArray();

        res.json(contacts);
    }catch(error){
        console.error(error)
        res.status(500).json({error:"Failed to get contacts"})
    }
})

//function for single contact by id
router.get('/:id', async (req, res) =>{
    try{
        const db = await dbConnect();

        const query = {_id: new ObjectId(req.params.id)}

        const contacts = await db.collection("contacts").findOne(query)

        res.json(contacts)
    }catch(error){
        console.error(error)
        res.status(500).json({message: error.message})
    }
})

module.exports = router;