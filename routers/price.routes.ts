const priceRoutes = require('express').Router();
const PriceController = require('../controllers/price.controller');
  // UsersService = require('../services/users.service')

  priceRoutes
  // .route('/')
  .get('/', PriceController.getPrices)
  .post('/', PriceController.createPrice)
  .put('/', PriceController.editPrice)
  .delete('/', PriceController.deletePrice)

export {priceRoutes}