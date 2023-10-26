import { app } from "../app.js";

export const getLogin = (req, res) => {
    res.render('login');
}

export const postLogin = (req, res) => {
    const { email, pass } = req.body;
    if (email !== process.env.EMAIL_SECRET || pass !== process.env.KEY_SECRET) {
        console.log('La contraseña o el correo no coincide');
        return res.render('login');
    }
    console.log('Las credenciales si coinciden.');
    app.locals.user = {
        email, pass
    }
    return res.redirect('/admin');
}

export const getLogout = (req, res) => {
    app.locals.user = null
    return res.redirect('/');
}