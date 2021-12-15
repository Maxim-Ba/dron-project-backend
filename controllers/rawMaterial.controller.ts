import { Request, Response, NextFunction } from 'express';
import RawMaterialService from '../services/rawMaterial.service';

class RawMaterialController {
  async getMaterials(req: Request,res:Response){
    
    try {
      const result = await RawMaterialService.getRawMaterials();
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async getMaterialsAndUnits(req: Request,res:Response){
    
    try {
      const result = await RawMaterialService.getMaterialsAndUnits();
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  
  async getMaterial(req: Request,res:Response){
    try {
      const id = Number.parseInt(req.params.id);
      const result = await RawMaterialService.getRawMaterial(id);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})
    }
  }

  async createMaterial(req: Request,res:Response){
    try {

      const {nameMaterial, units} = req.body;
      const result = await RawMaterialService.createRawMaterial(nameMaterial, units);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async editMaterial(req: Request,res:Response){
    try {

      if (!req.body.id) {
        throw new Error("не верный ID");
      }
      const payload = {
        raw_material_id:req.body.id,
        name:req.body.name,
        unit_name:req.body.units
      }

      const result = await RawMaterialService.editRawMaterial(payload);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})
    }
  }
  async deleteMaterial(req: Request,res:Response){
    try {
      const id = Number.parseInt(req.params.id);
      const result = await RawMaterialService.deleteRawMaterial(id);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new RawMaterialController();