const priceRoutes = require('express').Router();
const PriceController = require('../controllers/price.controller');

  priceRoutes
  .get('/', PriceController.getPrices)
  .get('/:id', PriceController.getPrice)
  .get('/raw-materials/:id', PriceController.getPricesByRawMaterial)
  .post('/', PriceController.createPrice)
  .put('/', PriceController.editPrice)
  // .delete('/:id', PriceController.deletePrice)

export {priceRoutes}