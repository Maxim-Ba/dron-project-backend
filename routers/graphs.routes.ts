import graphControllers from "../controllers/graph.controllers";
import authMiddleware from "../middleware/authMiddleware";

const graphRoutes = require('express').Router();


graphRoutes
.get('/',authMiddleware, graphControllers.getAll)
.get('/:id',authMiddleware , graphControllers.getClientsData)


export {graphRoutes}