const rawMaterialsRoutes = require('express').Router();
const RawMaterialController = require('../controllers/rawMaterial.controller');
  // UsersService = require('../services/users.service')

  rawMaterialsRoutes
  .get('/', RawMaterialController.getMaterials)
  .post('/', RawMaterialController.createMaterial)
  .put('/', RawMaterialController.editMaterial)
  .delete('/', RawMaterialController.deleteMaterial)

export {rawMaterialsRoutes}