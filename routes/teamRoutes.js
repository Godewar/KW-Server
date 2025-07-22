import express from 'express';
import { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } from '../controllers/teamController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/teams', upload.single('profileImage'), createTeam);
router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamById);
router.put('/teams/:id', upload.single('profileImage'), updateTeam);
router.delete('/teams/:id', deleteTeam);

export default router; 