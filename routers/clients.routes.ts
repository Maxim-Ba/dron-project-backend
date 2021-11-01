const clientsRoutes = require('express').Router();
const ClientController = require('../controllers/client.controller');
  // UsersService = require('../services/users.service')

clientsRoutes
  // .route('/')
  .get('/', ClientController.getClients)
  .post('/', ClientController.createClient)
  .put('/', ClientController.editClient)
  .delete('/', ClientController.deleteClient)

export {clientsRoutes}