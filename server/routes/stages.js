import express from 'express';
import { stage_post_winner, stages_all, stages_get_children, stages_get_leaderboard } from '../controllers/stageController';
var router = express.Router();

router.get('/all', stages_all);
router.get('/children/:id', stages_get_children);
router.post('/add_winner', stage_post_winner);
router.get('/leaderboard/:id', stages_get_leaderboard);

export default router;