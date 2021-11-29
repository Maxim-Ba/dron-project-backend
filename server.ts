import path from 'path';
import express from 'express';
import { clientsRoutes } from './routers/clients.routes';
import { ordesrRoutes } from './routers/orders.routes';
import { priceRoutes } from './routers/price.routes';
import { rawMaterialsRoutes } from './routers/rawMaterials.routes';
import { rawMaterialsListRoutes } from './routers/listOfMaterials';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './routers/user.router';
import authMiddleware from './middleware/authMiddleware';
dotenv.config();

export const rootPath = path.join(__dirname)

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors())
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/clients', authMiddleware, clientsRoutes)
app.use('/api/orders', authMiddleware, ordesrRoutes)
app.use('/api/price', authMiddleware, priceRoutes)
app.use('/api/raw-materials-list', authMiddleware, rawMaterialsListRoutes)
app.use('/api/raw-materials', authMiddleware, rawMaterialsRoutes)

const server = ()=>{
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);

}


app.listen(PORT, () => {
  server();
}); 