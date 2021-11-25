import { Request, Response, NextFunction } from 'express';
import OrderServices from '../services/orders.service'
class OrderController {
  async getOrders(req: Request,res:Response){

    try {
      const result = await OrderServices.getOrders();
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }

  async getOrder(req: Request,res:Response){
    try {
      const id = Number.parseInt(req.params.id);
      const result = await OrderServices.getOrder(id);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})
    }
  }

  async getOrdersByClient(req: Request,res:Response){
    try {
      const id = Number.parseInt(req.params.id);
      const result = await OrderServices.getOrdersByClient(id);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})
    }
  }

  async createOrder(req: Request,res:Response){
    try {

      const {client, price, date, rawMaterialList } = req.body;
      console.log(req.body)
      const result = await OrderServices.createOrder(date, client.id, price.id, rawMaterialList);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async editOrder(req: Request,res:Response){
    try {
      const {id, date} = req.body
      const result = await OrderServices.editOrder(id, date);

      console.log(result.rowCount)
      return res.json(result.rowCount);
    } catch (error:any) {
      console.log(error)
      return res.status(400).json({error:error.message})

    }
  }
  async deleteOrder(req: Request,res:Response){

    try {
      const id = Number.parseInt(req.params.id);
      const result = await OrderServices.deleteOrder(id);

      console.log(result.rowCount)
      return res.json(result.rowCount);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new OrderController();