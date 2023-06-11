import express  from "express";
import { login } from "../controllers/auth.js";

//Routes for all features

const router = express.Router(); // we'll use this router for routes  instead of app.use() for clean and modular code 

router.post("/login", login); // since we have app.use("/auth") in index.js, we don]t have to use /auth before /login

export default router;
