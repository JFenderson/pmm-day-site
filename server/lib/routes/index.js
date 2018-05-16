'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _gmail = require('./gmail');

var _gmail2 = _interopRequireDefault(_gmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import blogsRouter from './blogs';
// import authRouter from './auth';
// import usersRouter from './users';
// import stripeDonationsRouter from './stripeDonate';
// import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

var router = (0, _express.Router)();

// router.use('/auth', authRouter); //this section does not require login
// router.use('/donate', stripeDonationsRouter);
router.use('/contact', _gmail2.default);

// router.use(tokenMiddleware);//checking for tokens inorder to login
// router.use(isLoggedIn); //have to be logged in to get to this point

// router.use('/users', usersRouter);
// router.use('/blogs', blogsRouter);


exports.default = router;