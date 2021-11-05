const clientsRoutes = require('express').Router();
import ClientController  from '../controllers/client.controller';
  // UsersService = require('../services/users.service')

clientsRoutes
  // .route('/')
  .get('/', ClientController.getClients)
  .get('/:id', ClientController.getClient)
  .post('/', ClientController.createClient)
  .put('/', ClientController.editClient)
  .delete('/:id', ClientController.deleteClient)

export {clientsRoutes}