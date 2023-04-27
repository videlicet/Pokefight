import { Router } from 'express';
import { getAllFights, postFight} from '../controllers/leaderbord.js';

const leaderboardRouter = Router();

leaderboardRouter.route('/')
    .get(getAllFights)

leaderboardRouter.route('/save')
    .get(postFight)


export default leaderboardRouter;
