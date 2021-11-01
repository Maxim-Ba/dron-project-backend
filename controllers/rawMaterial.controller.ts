import { Request, Response, NextFunction } from 'express';

class RawMaterialController {
  async getMaterials(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async createMaterial(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async editMaterial(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async deleteMaterial(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new RawMaterialController();