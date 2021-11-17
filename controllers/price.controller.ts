import { Request, Response, NextFunction } from 'express';
import PriceService from '../services/price.service';

class PriceController {
  async getPrices(req: Request,res:Response){
    try {
      const result = await PriceService.getPrices();
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }

  async getPricesByRawMaterial(req: Request,res:Response){
    try {
      const rawMaterialsId = Number.parseInt(req.params.id);

      const result = await PriceService.getPricesByRawMaterials(rawMaterialsId);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }

  async getPricesNames(req: Request,res:Response){
    try {

      const result = await PriceService.getPriceNames();
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }

  
  async getPrice(req: Request,res:Response){
    try {
      const id = Number.parseInt(req.params.id);
      const result = await PriceService.getPrice(id);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})
    }
  }

  async createPrice(req: Request,res:Response){
    try {

      const {materialId, coast} = req.body;
      const result = await PriceService.createPrice(materialId, coast);

      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async editPrice(req: Request,res:Response){
    try {
      const {id, coast} = req.body
      const result = await PriceService.editPrice(id, coast);

      console.log(result.rowCount)
      return res.json(result.rowCount);
    } catch (error:any) {
      console.log(error)
      return res.status(400).json({error:error.message})

    }
  }
  async deletePrice(req: Request,res:Response){
    try {
      const id = Number.parseInt(req.params.id);
      const result = await PriceService.deletePrice(id);
      console.log(result.rowCount)
      return res.json(result.rowCount);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new PriceController();