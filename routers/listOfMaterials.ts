const rawMaterialsListRoutes = require('express').Router();
const RawMaterialsListController = require('../controllers/listOfMaterials.controllers');
  // UsersService = require('../services/users.service')

  rawMaterialsListRoutes
  .get('/', RawMaterialsListController.getLists)
  .get('/:id', RawMaterialsListController.getList)
  .post('/', RawMaterialsListController.createList)
  .put('/', RawMaterialsListController.editList)
  .delete('/', RawMaterialsListController.deleteList)

export {rawMaterialsListRoutes}