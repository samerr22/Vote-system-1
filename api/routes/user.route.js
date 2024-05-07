import express from 'express';
import { addvote, getAlluser, getVoteUser, signout, test, vote, } from '../controllers/user.controller.js';


const router = express.Router();


router.get('/test', test); 
router.post('/signout', signout);
router.post("/voteuser", addvote);
router.post('/addpoint/:userId', vote);
router.get("/getalluser", getAlluser);
router.get("/getvoteuser", getVoteUser);



export default router;