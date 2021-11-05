const rawMaterialsRoutes = require('express').Router();
const RawMaterialController = require('../controllers/rawMaterial.controller');

  rawMaterialsRoutes
  .get('/', RawMaterialController.getMaterials)
  .get('/:id', RawMaterialController.getMaterial)
  .post('/', RawMaterialController.createMaterial)
  .put('/', RawMaterialController.editMaterial)
  .delete('/:id', RawMaterialController.deleteMaterial)

export {rawMaterialsRoutes}