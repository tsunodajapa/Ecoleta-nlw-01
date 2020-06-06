// importandoo biblioteca express
import express from 'express'; 
import cors from 'cors';
import routes from './routes';
import path from 'path';
import {errors} from 'celebrate';

// declarando uma constante para receber o express
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname,"..","uploads")));

app.use(errors());
// Definindo porta 3333 para rodar a API
app.listen(3333);


