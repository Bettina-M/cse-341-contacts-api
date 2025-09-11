const {dbConnect} = require('../database/database');
const {ObjectId} = require('mongodb')

//function for all contacts
const getall=  async(req, res) =>{
    try{
        const db = await dbConnect()

        const contacts = await db.collection("contacts").find().toArray();

        res.json(contacts);
    }catch(error){
        console.error(error)
        res.status(500).json({error:"Failed to get contacts"})
    }
}

//function for single contact by id
const getbyId =  async (req, res) =>{
    try{
        const db = await dbConnect();

       const query = {_id: new ObjectId(req.params.id)}

       const contacts = await db.collection("contacts").findOne(query)

        res.json(contacts)
    }catch(error){
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

//function to add contact
const addContact = async (req, res) => {
    try {
        const contact = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            favcolor: req.body.favcolor,
            birthdate: req.body.birthdate
        };

        console.log("Request body:", req.body); // debugging
        const db = await dbConnect();
        const response = await db.collection("contacts").insertOne(contact);

        if (response.acknowledged) {
            res.status(201).json({ message: "Contact created", id: response.insertedId });
        } else {
            res.status(500).json({ error: "An error occurred creating the contact" });
        }
    } catch (error) {
        console.error("Error inserting contact", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
//function to update contact

const updateContact =  async(req, res)=>{
    try{
        
        const db = await dbConnect()
        const id = new ObjectId(req.params.id)

        //const filter = {_id:id};

        const updatecontact ={
            $set:{
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                favcolor: req.body.favcolor,
                birthdate: req.body.birthdate
            }
            
        }
       const result = await db.collection('contacts').updateOne({_id:id}, updatecontact)
        if (result.modifiedCount > 0){
            res.status(204).send()
        }else{
            res.status(500).json(result.error)
        }
    
    }catch(error){
        console.error(error)
    }
}

//function to delete contact
const deleteContact = async (req, res) =>{

    const db = await dbConnect()

    const userId = new ObjectId(req.params.id)

    const response = await db.collection('contacts').deleteOne({_id: userId})

    console.log(response)

    if(response.deletedCount >0){
        res.status(204).send();

    }else{
        res.status(500).json(response.error)
    }
}

module.exports={
    getall,
    getbyId,
    addContact,
    updateContact,
    deleteContact
}
