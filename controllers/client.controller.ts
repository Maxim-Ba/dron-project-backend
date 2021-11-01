import { Request, Response, NextFunction } from 'express';

class ClientController {
  async getClients(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async createClient(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async editClient(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
  async deleteClient(req: Request,res:Response){
    try {
      console.log(2342342)
      return res.status(200).send('hgdfhgfhg')
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})

    }
  }
}
module.exports = new ClientController();