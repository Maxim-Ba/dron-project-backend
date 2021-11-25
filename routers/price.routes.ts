const priceRoutes = require('express').Router();
const PriceController = require('../controllers/price.controller');

  priceRoutes
  .get('/', PriceController.getPrices)
  .get('/price-names', PriceController.getPricesNames)
  .get('/:name', PriceController.getPrice)
  .get('/raw-materials/:id', PriceController.getPricesByRawMaterial)
  .post('/', PriceController.createPrice)
  .post('/price-names', PriceController.createPriceName)
  .put('/', PriceController.editPrice)
  .delete('/:id', PriceController.deletePrice)

export {priceRoutes}