import { Router } from 'express';
import contactRouter from './gmail';
import userRouter from './user';
import stripeDonationsRouter from './stripePay';


let router = Router();

router.use('/charge', stripeDonationsRouter);
router.use('/contact', contactRouter);
router.use('/signup', userRouter);



export default router;