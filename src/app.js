import Express from "express";
import cors from 'cors';
import { engine } from 'express-handlebars';
import * as path from "path";
import { fileURLToPath } from "url";
import * as dotenv from 'dotenv';
import homeRouter from "./router/home.router.js";
import loginRouter from "./router/login.router.js";
import adminRouter from "./router/admin.router.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const app = Express();

//middleware
app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(Express.json());
app.use(Express.urlencoded({extended: false}));
//public
app.use(Express.static(path.join(__dirname, '/public')))
//config
dotenv.config();
app.set("views", path.resolve(__dirname, "./views"));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: [path.join(app.get('views'), 'partials'),],
    extname: '.hbs',
}))
app.set('view engine', '.hbs');

//routes
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
//var global
app.use((req,res,next)=>{
    app.locals.user = req.user;  
    next()   
})
//server
app.listen(8001);
console.log('Server iniciado');