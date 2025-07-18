import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { routes } from "./routes/routes.js";
import { connectDB } from "./models/db.js";
import swaggerUi from "swagger-ui-express";
import path, { dirname } from "path";
import fs from "fs";

dotenv.config();
connectDB();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Swagger Docs
const swaggerFile = fs.readFileSync(path.join(__dirname, "swagger.json"), 'utf8');
const swaggerJSON = JSON.parse(swaggerFile);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));
//End Swagger Docs

app.use(routes);

export {
    app, 
    PORT
}