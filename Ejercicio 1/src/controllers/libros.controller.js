
const db = require('../config/database');

// GET: Obtener todos los libros
const obtenerLibros = async (req, res) => {
    try {
        const [libros] = await db.query(
            'SELECT * FROM libros ORDER BY id ASC'
        );

        return res.status(200).json({
            total: libros.length,
            libros
        });

    } catch (error) {
        console.error('Error al listar libros:', error);
        return res.status(500).json({
            error: 'Error interno al consultar los libros'
        });
    }
};

// GET: Obtener un libro por ID
const obtenerLibroPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El ID debe ser un número entero positivo'
            });
        }

        const [libros] = await db.query(
            'SELECT * FROM libros WHERE id = ?',
            [id]
        );

        if (libros.length === 0) {
            return res.status(404).json({
                error: 'Libro no encontrado'
            });
        }

        return res.status(200).json(libros[0]);

    } catch (error) {
        console.error('Error al consultar libro:', error);
        return res.status(500).json({
            error: 'Error interno al consultar el libro'
        });
    }
};

// POST: Crear un libro
const crearLibro = async (req, res) => {
    try {
        const {
            titulo,
            autor,
            editorial,
            anio_publicacion,
            precio,
            stock
        } = req.body;

        if (
            typeof titulo !== 'string' ||
            !titulo.trim() ||
            titulo.trim().length > 150
        ) {
            return res.status(400).json({
                error: 'El título es obligatorio y admite hasta 150 caracteres'
            });
        }

        if (
            typeof autor !== 'string' ||
            !autor.trim() ||
            autor.trim().length > 120
        ) {
            return res.status(400).json({
                error: 'El autor es obligatorio y admite hasta 120 caracteres'
            });
        }

        if (
            editorial != null &&
            (typeof editorial !== 'string' || editorial.length > 100)
        ) {
            return res.status(400).json({
                error: 'La editorial admite hasta 100 caracteres'
            });
        }

        if (
            anio_publicacion != null &&
            (!Number.isInteger(Number(anio_publicacion)) ||
             Number(anio_publicacion) < 1901 ||
             Number(anio_publicacion) > 2155)
        ) {
            return res.status(400).json({
                error: 'El año debe estar entre 1901 y 2155'
            });
        }

        if (
            precio === undefined ||
            precio === null ||
            precio === '' ||
            !Number.isFinite(Number(precio)) ||
            Number(precio) < 0
        ) {
            return res.status(400).json({
                error: 'El precio debe ser un número mayor o igual a cero'
            });
        }

        const cantidadStock = stock === undefined ? 0 : stock;

        if (
            !Number.isInteger(Number(cantidadStock)) ||
            Number(cantidadStock) < 0
        ) {
            return res.status(400).json({
                error: 'El stock debe ser un entero mayor o igual a cero'
            });
        }

        const [resultado] = await db.query(
            `INSERT INTO libros
            (titulo, autor, editorial, anio_publicacion, precio, stock)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                titulo.trim(),
                autor.trim(),
                editorial || null,
                anio_publicacion || null,
                Number(precio),
                Number(cantidadStock)
            ]
        );

        return res.status(201).json({
            mensaje: 'Libro registrado correctamente',
            id: resultado.insertId
        });

    } catch (error) {
        console.error('Error al crear libro:', error);
        return res.status(500).json({
            error: 'Error interno al registrar el libro'
        });
    }
};

// PUT: Actualizar un libro
const actualizarLibro = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El ID debe ser un número entero positivo'
            });
        }

        const {
            titulo,
            autor,
            editorial,
            anio_publicacion,
            precio,
            stock
        } = req.body;

        if (
            typeof titulo !== 'string' ||
            !titulo.trim() ||
            titulo.trim().length > 150
        ) {
            return res.status(400).json({
                error: 'El título es obligatorio y admite hasta 150 caracteres'
            });
        }

        if (
            typeof autor !== 'string' ||
            !autor.trim() ||
            autor.trim().length > 120
        ) {
            return res.status(400).json({
                error: 'El autor es obligatorio y admite hasta 120 caracteres'
            });
        }

        if (
            editorial != null &&
            (typeof editorial !== 'string' || editorial.length > 100)
        ) {
            return res.status(400).json({
                error: 'La editorial admite hasta 100 caracteres'
            });
        }

        if (
            anio_publicacion != null &&
            (!Number.isInteger(Number(anio_publicacion)) ||
             Number(anio_publicacion) < 1901 ||
             Number(anio_publicacion) > 2155)
        ) {
            return res.status(400).json({
                error: 'El año debe estar entre 1901 y 2155'
            });
        }

        if (
            precio === undefined ||
            precio === null ||
            precio === '' ||
            !Number.isFinite(Number(precio)) ||
            Number(precio) < 0
        ) {
            return res.status(400).json({
                error: 'El precio debe ser un número mayor o igual a cero'
            });
        }

        if (
            !Number.isInteger(Number(stock)) ||
            Number(stock) < 0
        ) {
            return res.status(400).json({
                error: 'El stock debe ser un entero mayor o igual a cero'
            });
        }

        const [resultado] = await db.query(
            `UPDATE libros
            SET titulo = ?,
                autor = ?,
                editorial = ?,
                anio_publicacion = ?,
                precio = ?,
                stock = ?
            WHERE id = ?`,
            [
                titulo.trim(),
                autor.trim(),
                editorial || null,
                anio_publicacion || null,
                Number(precio),
                Number(stock),
                id
            ]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Libro no encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'Libro actualizado correctamente',
            id
        });

    } catch (error) {
        console.error('Error al actualizar libro:', error);
        return res.status(500).json({
            error: 'Error interno al actualizar el libro'
        });
    }
};

// DELETE: Eliminar un libro
const eliminarLibro = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El ID debe ser un número entero positivo'
            });
        }

        const [resultado] = await db.query(
            'DELETE FROM libros WHERE id = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Libro no encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'Libro eliminado correctamente',
            id
        });

    } catch (error) {
        console.error('Error al eliminar libro:', error);
        return res.status(500).json({
            error: 'Error interno al eliminar el libro'
        });
    }
};

module.exports = {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};
