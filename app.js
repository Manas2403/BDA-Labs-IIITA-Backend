import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import db from "./db.config.js";
import morgan from "morgan";
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
db();
app.listen(
    process.env.PORT ? process.env.PORT : 8080,
    process.env.HOST ? process.env.HOST : "127.0.0.1",
    console.log(
        `listening on http://localhost:${
            process.env.PORT ? process.env.PORT : 8080
        }/`
    )
);
