import { NextFunction, Request, Response } from 'express';
import {   check  } from 'express-validator';

export default [

  check('email', 'Your email is not valid').not().isEmpty().isEmail(),
  check('password', 'Your password must be min 4 characters & max 16').not().isEmpty().isLength({min:4,max:16}),
]


