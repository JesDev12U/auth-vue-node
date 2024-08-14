import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rAuth from "./routes/rAuth.js";
import errors from "./middlewares/errors.js";

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rAuth);
app.use((req, res) => errors.e404(req, res, "Not Found"));

app.listen(PORT, () => console.log(`Listen on http://localhost:${PORT}`));
