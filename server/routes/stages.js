import express from 'express';
import { stage_post_add, stage_post_winner, stages_all, stages_get_children, stages_get_leaderboard, stages_update_time } from '../controllers/stageController';
var router = express.Router();

router.get('/all', stages_all);
router.get('/children/:id', stages_get_children);
router.get('/update_time/:id', stages_update_time);
router.post('/add_winner', stage_post_winner);
router.get('/leaderboard/:id', stages_get_leaderboard);
router.post('/add_stage', stage_post_add);

export default router;