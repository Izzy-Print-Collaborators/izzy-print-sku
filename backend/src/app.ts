import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors()); // 👈 AQUI (antes das rotas)
app.use(express.json());

app.use(routes);

export default app;
