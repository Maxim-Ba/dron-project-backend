import { Request, Response, NextFunction } from 'express';
import OrderServices from '../services/orders.service'
import { rootPath } from '../server';
class OrderController {
  async getOrders(req: Request,res:Response){

    try {
      const {dateStart, dateEnd} = req.params;
      const result = await OrderServices.getOrders(dateStart as string, dateEnd as string);
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
      const {clientId , dateStart, dateEnd} = req.params;
      const result = await OrderServices.getOrdersByClient(Number.parseInt(clientId as string) ,dateStart as string, dateEnd as string);
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

  async createExel(req: Request,res:Response){
    try {
      const {orderData } = req.body;
      const result = await OrderServices.createExel(orderData);
      return res.download(rootPath+"/exel"+'/export.xlsx',(err)=>console.log(err));
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new OrderController();