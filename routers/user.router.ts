import UserController from "../controllers/user.controller";
import authMiddleware from "../middleware/authMiddleware";
import validationMiddleware from "../middleware/validationUserMiddleware";

const userRoutes = require('express').Router();
// import ClientController  from '../controllers/client.controller';

  userRoutes
  .get('/auth',authMiddleware ,UserController.authUser)
  .post('/login', UserController.loginUser)
  .post('/registration', validationMiddleware, UserController.createUser)

export {userRoutes}