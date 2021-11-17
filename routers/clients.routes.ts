const clientsRoutes = require('express').Router();
import ClientController  from '../controllers/client.controller';
import authMiddleware from '../middleware/authMiddleware';

clientsRoutes
  .get('/', authMiddleware,ClientController.getClients)
  .get('/:id', authMiddleware,ClientController.getClient)
  .post('/', authMiddleware,ClientController.createClient)
  .put('/', authMiddleware,ClientController.editClient)
  .delete('/:id',authMiddleware, ClientController.deleteClient)

export {clientsRoutes}