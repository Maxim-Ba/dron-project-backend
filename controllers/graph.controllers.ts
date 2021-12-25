import { Request, Response } from 'express';
import graphServise from '../services/graphServise';


class GraphControllers {

  async getAll(req:Request,res:Response){
    try {
      const result = await graphServise.getAll();
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})
    }
  };
  

  async getClientsData(req:Request,res:Response){
    try {
      const {id} = req.params
      const result = await graphServise.getClientsData(id as unknown as number);
      return res.json(result);
    } catch (error) {
      console.log(error)
      return res.status(400).json({error:error})
    }
  };
};

export default  new GraphControllers();