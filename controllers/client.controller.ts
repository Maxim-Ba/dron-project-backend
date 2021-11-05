import { Request, Response, NextFunction } from 'express';
import ClientServices from '../services/client.service';

class ClientController {
  async getClients(req: Request,res:Response){

    try {
      const result = await ClientServices.getClients();
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }

  async getClient(req: Request,res:Response){

    try {
      const id = Number.parseInt(req.params.id);
      const result = await ClientServices.getClient(id);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }

  async createClient(req: Request,res:Response){
    try {

      const {name, inn, phone} = req.body;
      return res.json(
        await ClientServices.createClient(name, inn, phone)
      );
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async editClient(req: Request,res:Response){
    try {
      if (!req.body.id) {
        throw new Error("не верный ID");
      }
      const result = await ClientServices.editClient(req.body);

      console.log(result.rowCount)
      return res.json(result.rowCount);
    } catch (error:any) {
      console.log(error)
      return res.status(400).json({error:error.message})

    }
  }
  async deleteClient(req: Request,res:Response){

    try {
      const id = Number.parseInt(req.params.id);
      const result = await ClientServices.deleteClient(id);

      console.log(result.rowCount)
      return res.json(result.rowCount);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
export default new ClientController();