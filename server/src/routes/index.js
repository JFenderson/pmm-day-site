import { Router } from 'express';
import contactRouter from './gmail';
import userRouter from './user';
import stripeDonationsRouter from './stripePay';
// import blogsRouter from './blogs';
// import authRouter from './auth';
// import usersRouter from './users';
// import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

// router.use('/auth', authRouter); //this section does not require login
router.use('/charge', stripeDonationsRouter);
router.use('/contact', contactRouter);
router.use('/signup', userRouter);
// router.use(tokenMiddleware);//checking for tokens inorder to login
// router.use(isLoggedIn); //have to be logged in to get to this point

// router.use('/users', usersRouter);
// router.use('/blogs', blogsRouter);


export default router;