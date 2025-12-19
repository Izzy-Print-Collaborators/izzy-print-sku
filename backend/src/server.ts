import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import routes from "./routes";

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});

