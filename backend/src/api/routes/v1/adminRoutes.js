const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUser, updateUser, getUserById } = require('../../controllers/adminController');
const {createUserValidator,deleteUserValidator,updateUserValidator , getUserByIdValidator}= require('../../utils/validators/adminValidator')
// Route to get all users
router.get('/users' ,getAllUsers);

// Route to create a new user
router.post('/users' ,createUser);

// Route to delete a user by ID
router.delete('/users/:userId',deleteUserValidator, deleteUser);

// Route to update a user by ID
router.put('/users/:userId' ,updateUser);

// Route to get a user by ID
router.get('/users/:userId',getUserByIdValidator, getUserById);

module.exports = router;
