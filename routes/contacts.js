const express = require('express');
const router = express.Router();
const controller = require('../controller/contacts');

//function for all contacts
router.get("/", controller.getall)

//function for single contact by id
router.get('/:id',controller.getbyId)

router.post('/', controller.addContact)

router.put('/:id', controller.updateContact)

router.delete('/:id', controller.deleteContact)

module.exports = router;