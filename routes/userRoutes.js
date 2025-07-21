import express from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// User registration (with optional profile image)
router.post('/user/register', upload.single('profileImage'), registerUser);
// User login
router.post('/user/login', loginUser);
// Get all users
router.get('/user', getAllUsers);
// Get user by ID
router.get('/user/:id', getUserById);
// Update user
router.put('/user/:id', upload.single('profileImage'), updateUser);
// Delete user
router.delete('/user/:id', deleteUser);

export default router;
