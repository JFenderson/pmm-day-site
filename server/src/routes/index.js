import { Router } from 'express';
import contactRouter from './gmail';
import userRouter from './user';
import stripeDonationsRouter from './stripePay';
import awsPhotoRouter from './awsphotos';
import dotenv from 'dotenv';
dotenv.config();


let router = Router();

router.use('/charge', stripeDonationsRouter);
router.use('/contact', contactRouter);
router.use('/signup', userRouter);
router.use('/photos', awsPhotoRouter);



export default router;