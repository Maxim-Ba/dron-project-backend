import { Request, Response, NextFunction } from 'express';
import ListOfMaterialServices from '../services/listOfMaterials.service';

class RawMaterialsListController {
  async getRows(req: Request,res:Response){
    try {
      const result = await ListOfMaterialServices.getMaterialLists();
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async getRow(req: Request,res:Response){
    try {
      const id = Number.parseInt(req.params.id);
      const result = await ListOfMaterialServices.getMaterialList(id);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})
    }
  }
  async createRow(req: Request,res:Response){
    try {

      const {nameRawMaterial, amount, orderId} = req.body;
      const result = await ListOfMaterialServices.createMaterialList(nameRawMaterial, amount, orderId);
      console.log(result, '00000000000000000000')

      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async editRow(req: Request,res:Response){
    try {

      if (!req.body.id) {
        throw new Error("не верный ID");
      }
      const payload = {
        raw_material:req.body.nameRawMaterial,
        amount:req.body.amount,
        order_id:req.body.orderId
      }
      console.log(payload)
      console.log(req.body)

      const result = await ListOfMaterialServices.editMaterialList(payload);
      console.log(result.rowCount)
      return res.json(result.rowCount);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})
    }
  }
  async deleteRow(req: Request,res:Response){
    try {
      const id = Number.parseInt(req.params.id);
      const result = await ListOfMaterialServices.deleteMaterialList(id);

      console.log(result.rowCount)
      return res.json(result.rowCount);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new RawMaterialsListController();