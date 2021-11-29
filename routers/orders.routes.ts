const ordesrRoutes = require('express').Router();
const OrderController = require('../controllers/orders.controller');

  ordesrRoutes
  // .route('/')
  .get('/all-orders/:dateStart/:dateEnd', OrderController.getOrders)
  .get('/:id', OrderController.getOrder)
  .get('/client/:clientId/:dateStart/:dateEnd', OrderController.getOrdersByClient)
  .post('/', OrderController.createOrder)
  .post('/createExele', OrderController.createExel)
  .put('/', OrderController.editOrder)
  .delete('/:id', OrderController.deleteOrder)

export {ordesrRoutes}