import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";//Biblioteca que permite analizar y obtener las cookies
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost',
  credentials: true
}));

app.use(morgan("dev"));
app.use(express.json());

//COOKIEPARSER DEBE IR ANTES DE authRouter (DONDE SE UTILIZA)
app.use(cookieParser());

export default app
