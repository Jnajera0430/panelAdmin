import { Router } from "express";
import { getHome } from "../controller/home.controller.js";
import { userLogged } from "../middleware/auth.middleware.js";

const homeRouter = Router();

homeRouter.get('/',userLogged,getHome);


export default homeRouter;