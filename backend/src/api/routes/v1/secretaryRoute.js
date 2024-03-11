const express = require('express');
const {deleteSecretary,updateSecretary,createSecretary,getSecretaryById} = require('../../controllers/secretaryController');

const router = express.Router();

// Create a new secretary
router.post('/', createSecretary);

// Get secretary by ID
router.get('/:id', getSecretaryById);

// Update secretary
router.put('/:id', updateSecretary);

// Delete secretary
router.delete('/:id',deleteSecretary);

module.exports = router;
