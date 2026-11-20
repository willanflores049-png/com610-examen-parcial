require('dotenv').config();

const express = require('express');
const librosRoutes = require('./routes/libros.routes');

const app = express();
// Puerto de la aplicación
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API REST de Libros - COM610',
        estado: 'Funcionando',
        version: '1.0.0'
    });
});

// Estado de la API
app.get('/api/health', (req, res) => {
    res.status(200).json({
        estado: 'OK',
        servicio: 'API de Libros'
    });
});

// Rutas de libros
app.use('/api/libros', librosRoutes);

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    });
});

// Iniciar servidor
if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });
}

module.exports = app;
