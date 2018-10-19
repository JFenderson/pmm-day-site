import { Router } from 'express';
import stateRouting from '../middleware/routing.mw';
import contactRouter from './gmail';
import userRouter from './user';
import stripeDonationsRouter from './stripePay';
import awsPhotoRouter from './photos';
import dotenv from 'dotenv';
import $ from 'jquery';
dotenv.config();


let router = Router();

router.use('/charge', stripeDonationsRouter);
router.use('/contact', contactRouter);
router.use('/user', userRouter);
router.use('/photos', awsPhotoRouter);



export default router;