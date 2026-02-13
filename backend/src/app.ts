import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // 🔥 IMPORTAR
import routes from './routes';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser()); // 🔥 USAR AQUI (ANTES DAS ROTAS)

app.use(routes);

export default app;
