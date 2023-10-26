import fs from 'fs'
import { v4 as uuid } from 'uuid'
const filePath = './src/dataFile.json';
export const getPanelAdmin = (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        data.forEach((item, index) => {
            item.index = index + 1;
        });
        return res.render('admin', { data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al leer el archivo' });
    }
}

export const postSaveMessage = async (req, res) => {

    try {
        // Realiza la lectura del archivo de manera sincrónica
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const { email, message } = req.body;
        data.push({
            id: uuid(),
            email,
            message
        })
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
        return res.status(201).json({
            status: 201,
            message: 'Mensaje creado exitosamente.',
            data: {
                email, message
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 500, error: 'Error al leer el archivo' });
    }
}

export const deleteMessage = async (req, res) => {
    try {

        const { id } = req.param;
        let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        data = data.filter((item) => item.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
        data.forEach((item, index) => {
            item.index = index + 1;
        });
        return await res.render('admin', { data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al leer el archivo' });
    }
}

export const patchMessage = async (req, res) => {
    try {
        const { id } = req.param;
        const { email, message } = req.body;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        data.forEach((item, index) => {
            if (id === item.id) {
                item.email = email;
                item.message = message;
            }
        });
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
        data.forEach((item, index) => {
            item.index = index + 1;
        });
        return await res.render('admin', { data });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al leer el archivo' });
    }
}

export const deleteAllMessage = async (req, res) => {
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return await res.render('admin', { data });
}