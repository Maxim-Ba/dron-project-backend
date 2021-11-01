import { Request, Response, NextFunction } from 'express';

class PriceController {
  async getPrices(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async createPrice(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async editPrice(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async deletePrice(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new PriceController();