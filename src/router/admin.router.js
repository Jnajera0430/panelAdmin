import { Router } from "express";
import { deleteAllMessage, deleteMessage, getPanelAdmin, patchMessage, postSaveMessage } from "../controller/admin.controller.js";
import { userIsNotLogged } from "../middleware/auth.middleware.js";

const adminRouter = Router();

adminRouter.get('/', userIsNotLogged, getPanelAdmin);
adminRouter.post('/saveMessage', userIsNotLogged, postSaveMessage);
adminRouter.post('/deleteMessage', userIsNotLogged, deleteMessage);
adminRouter.patch('/editmessage', userIsNotLogged, patchMessage);
adminRouter.delete('/deleteAll', deleteAllMessage);

export default adminRouter;