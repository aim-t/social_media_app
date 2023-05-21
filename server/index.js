import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet"
import morgan from "morgan";
import path from "path";
import { fileURLToPath  } from "url";

// Middleware and package Configuration
// Middleware are functions that run between requests

const __filename = fileURLToPath(import.meta.url); // we need this configuration to grab the directory name
const __dirname = path.dirname(__filename); // we need both these only when we are using type:module in package.json

dotenv.config(); // so we can use dotenv files

const app = express(); // we invoke express so that we can use middleware

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit:"30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true }));
app.use(cors()); //invoke cross-origin sharing policies
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); // will set the directories where we keep our assets i.e images locally. In a real-life project, we''l want to store our data in cloud like S3 but here we'll store it locally

// File storage (Check package instructions from the github repo of the package that you are using e.g multer)

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
}); //This is how we save our files. Anytime, someone uploads a file on our website, then it is going to be saved in "public/assets" folder 
const upload = multer({ storage });

