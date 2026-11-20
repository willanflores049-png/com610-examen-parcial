
const express = require('express');
const router = express.Router();

const librosController = require('../controllers/libros.controller');

// Listar todos los libros
router.get('/', librosController.obtenerLibros);

// Obtener un libro por ID
router.get('/:id', librosController.obtenerLibroPorId);

// Registrar un libro
router.post('/', librosController.crearLibro);

// Actualizar un libro
router.put('/:id', librosController.actualizarLibro);

// Eliminar un libro
router.delete('/:id', librosController.eliminarLibro);

module.exports = router;
