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

      const {name, nameUnits} = req.body;
      const result = await RawMaterialService.createRawMaterial(name, nameUnits);
      console.log(result, '00000000000000000000')

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
        name_units:req.body.nameUnits
      }
      console.log(payload)
      console.log(req.body)

      const result = await RawMaterialService.editRawMaterial(payload);
      console.log(result.rowCount)
      return res.json(result.rowCount);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})
    }
  }
  async deleteMaterial(req: Request,res:Response){
    try {
      const id = Number.parseInt(req.params.id);
      const result = await RawMaterialService.deleteRawMaterial(id);

      console.log(result.rowCount)
      return res.json(result.rowCount);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new RawMaterialController();