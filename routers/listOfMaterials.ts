const rawMaterialsListRoutes = require('express').Router();
const RawMaterialsListController = require('../controllers/listOfMaterials.controllers');

  rawMaterialsListRoutes
  .get('/', RawMaterialsListController.getRows)
  .get('/:id', RawMaterialsListController.getRow)
  .post('/', RawMaterialsListController.createRow)
  .put('/', RawMaterialsListController.editRow)
  .delete('/:id', RawMaterialsListController.deleteRow)

export {rawMaterialsListRoutes}