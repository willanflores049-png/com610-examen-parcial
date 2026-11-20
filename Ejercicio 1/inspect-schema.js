require('dotenv').config();
const db = require('./src/config/database');

async function inspectSchema() {
    try {
        console.log('\n=== ESTRUCTURA DE LIBROS ===');

        const [columns] = await db.query('DESCRIBE libros');
        console.table(columns);

        console.log('\n=== REGISTROS EXISTENTES ===');

        const [rows] = await db.query(
            'SELECT * FROM libros LIMIT 5'
        );

        console.table(rows);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await db.end();
    }
}

inspectSchema();
