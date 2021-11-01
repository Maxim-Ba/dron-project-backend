import { Request, Response, NextFunction } from 'express';

class OrderController {
  async getOrders(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async createOrder(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async editOrder(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async deleteOrder(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new OrderController();