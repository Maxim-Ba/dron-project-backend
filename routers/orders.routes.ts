const ordesrRoutes = require('express').Router();
const OrderController = require('../controllers/orders.controller');

  ordesrRoutes
  // .route('/')
  .get('/', OrderController.getOrders)
  .get('/:id', OrderController.getOrder)
  .get('/client/:id', OrderController.getOrdersByClient)
  .post('/', OrderController.createOrder)
  .put('/', OrderController.editOrder)
  .delete('/:id', OrderController.deleteOrder)

export {ordesrRoutes}