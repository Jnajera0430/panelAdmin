import { Router } from "express";
import { getLogin, getLogout, postLogin } from "../controller/login.controller.js";
import { userLogged } from "../middleware/auth.middleware.js";

const loginRouter = Router();

loginRouter.get('/',userLogged,getLogin);
loginRouter.post('/',postLogin);
loginRouter.get('/logout',getLogout);

export default loginRouter;