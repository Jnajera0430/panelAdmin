import { app } from "../app.js"

export const userIsNotLogged = (req, res, next) => {
    if (app.locals.user) {
        return next();
    }
    return res.redirect('login');
}

export const userLogged = (req, res, next) => {
    if (!app.locals.user) {
        return next();
    }
    return res.redirect('admin');
}