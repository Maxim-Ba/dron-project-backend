import express from 'express';
import { pool } from './db/pool';
import { Request, Response, NextFunction } from 'express';
import { clientsRoutes } from './routers/clients.routes';
import { ordesrRoutes } from './routers/orders.routes';
import { priceRoutes } from './routers/price.routes';
import { rawMaterialsRoutes } from './routers/rawMaterials.routes';
import { rawMaterialsListRoutes } from './routers/listOfMaterials';
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();



app.use(express.json())
app.use('/api/clients', clientsRoutes)
app.use('/api/orders', ordesrRoutes)
app.use('/api/price', priceRoutes)
app.use('/api/raw-materials-list', rawMaterialsListRoutes)
app.use('/api/raw-materials', rawMaterialsRoutes)

const server = ()=>{
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);

}


app.listen(PORT, () => {
  server();
}); 