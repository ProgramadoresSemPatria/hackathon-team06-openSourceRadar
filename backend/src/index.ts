import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import exampleRoutes from "./routes/ExampleRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", exampleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
