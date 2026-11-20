require('dotenv').config();

const db = require('./src/config/database');

async function testConnection() {
    try {
        const [rows] = await db.query(
            'SELECT DATABASE() AS database_name, VERSION() AS mysql_version'
        );

        console.log('CONEXION A RDS EXITOSA');
        console.table(rows);

    } catch (error) {
        console.error('ERROR DE CONEXION:', error.message);
        process.exitCode = 1;
    } finally {
        await db.end();
    }
}

testConnection();
