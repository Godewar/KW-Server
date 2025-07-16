import express from 'express';
import { syncAgentsFromKWPeople, syncAgentsFromMultipleKWPeople, getFilteredAgents } from '../controllers/agentController.js';

const router = express.Router();

router.get('/agent/:org_id', syncAgentsFromKWPeople);
router.get('/agents/merge', getFilteredAgents);


export default router;