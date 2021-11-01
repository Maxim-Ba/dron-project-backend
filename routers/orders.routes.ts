const ordesrRoutes = require('express').Router();
const OrderController = require('../controllers/orders.controller');
  // UsersService = require('../services/users.service')

  ordesrRoutes
  // .route('/')
  .get('/', OrderController.getOrders)
  .post('/', OrderController.createOrder)
  .put('/', OrderController.editOrder)
  .delete('/', OrderController.deleteOrder)

export {ordesrRoutes}