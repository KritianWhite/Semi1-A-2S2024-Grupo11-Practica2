import cors from "cors"
import router from "./Routes/api.mjs";
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Ajustamos el limite de subida de archivos a 50mb
app.use(router);
app.use(morgan('dev'));

app.set("port", 4000);

export default app;