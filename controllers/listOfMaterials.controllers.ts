import { Request, Response, NextFunction } from 'express';

class RawMaterialsListController {
  async getLists(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async getList(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async createList(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async editList(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async deleteList(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new RawMaterialsListController();