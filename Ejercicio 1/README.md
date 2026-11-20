# Segundo Examen Parcial - Ejercicio 1 – COM610

**Universidad San Francisco Xavier de Chuquisaca**
**Gestión:** 2/2026
**Proyecto:** API REST para la gestión de un catálogo de libros.

## 1. Descripción del proyecto

Este proyecto consiste en implementar y desplegar una API REST para administrar un catálogo de libros, utilizando servicios de Amazon Web Services (AWS).

La aplicación permite registrar, consultar, actualizar y eliminar libros mediante operaciones HTTP. Los datos se almacenan de forma persistente en una base de datos MySQL alojada en Amazon RDS.

## 2. Arquitectura de infraestructura AWS

La infraestructura implementada utiliza los siguientes servicios:

| Componente | Tecnología | Función |
|---|---|---|
| Infraestructura de red | Amazon VPC | Red virtual de AWS |
| Servidor de aplicación | Amazon EC2 | Ejecutar la API REST |
| Sistema operativo | Ubuntu Server | Entorno de ejecución |
| Base de datos | Amazon RDS MySQL | Almacenamiento persistente |
| Seguridad de red | Security Groups | Controlar el tráfico de entrada y salida |

**Región AWS:** `us-east-1`

### Comunicación entre servicios

El flujo de comunicación es:

1. Los clientes realizan solicitudes HTTP a la API desplegada en EC2.
2. Node.js y Express procesan las solicitudes.
3. La aplicación consulta o modifica los registros almacenados en Amazon RDS.
4. La comunicación entre EC2 y RDS utiliza MySQL mediante TLS.

## 3. Tecnologías utilizadas

- Amazon EC2.
- Amazon RDS MySQL 8.4.
- Ubuntu Server.
- Node.js.
- Express 5.
- MySQL2.
- Dotenv.
- Git y GitHub.

## 4. Estructura del proyecto

```text
Ejercicio 1/
├── .env                  # Local, excluido de Git
├── .env.example
├── .gitignore
├── README.md
├── db.sql
├── global-bundle.pem     # Certificado CA local, excluido de Git
├── package.json
├── package-lock.json
├── test-db.js
├── inspect-schema.js
├── src/
│   ├── app.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── libros.controller.js
│   └── routes/
│       └── libros.routes.js
└── evidencias/
    ├── 01-com610-VPC-sg.png
    ├── 02-com610-ec2-sg.png
    └── 03-com610-rds-sg.png
```

Los archivos `.env`, `global-bundle.pem` y el directorio `node_modules/` están excluidos del repositorio Git.

## 5. Base de datos

**Motor:** MySQL 8.4.11
**Nombre:** `com610_db`
**Tabla principal:** `libros`

La tabla administra los siguientes campos utilizados por la API:

| Campo | Descripción |
|---|---|
| id | Identificador del libro |
| titulo | Título del libro |
| autor | Autor |
| editorial | Editorial |
| anio_publicacion | Año de publicación |
| precio | Precio del libro |
| stock | Cantidad disponible |

La base de datos se encuentra alojada en Amazon RDS.

La conectividad entre EC2 y RDS fue comprobada satisfactoriamente.

## 6. Configuración del entorno

La aplicación utiliza variables de entorno para administrar su configuración y credenciales.

Crear un archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
nano .env
```

Variables necesarias:

```env
PORT=3000

DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=com610_db
DB_CONNECTION_LIMIT=10
```

Se deben sustituir los valores de ejemplo por los datos correspondientes a la instancia RDS.

**Importante:** Nunca publicar el archivo `.env` ni las credenciales de acceso en GitHub.

## 7. Instalación

Ingresar al directorio del proyecto:

```bash
cd "Ejercicio 1"
```

Instalar las dependencias:

```bash
npm install
```

Colocar el certificado CA de AWS RDS en:

```text
global-bundle.pem
```

Configurar las variables de entorno y verificar que el usuario de la aplicación tenga permisos de acceso a la base de datos.

## 8. Ejecución de la aplicación

Iniciar el servidor:

```bash
npm start
```

Para desarrollo:

```bash
npm run dev
```

La aplicación utiliza el puerto `3000` por defecto y escucha en `0.0.0.0`.

Mensaje esperado:

```text
Servidor ejecutándose en puerto 3000
```

## 9. Configuración de Nginx

Nginx se configuró como proxy inverso para recibir las solicitudes HTTP
externas y redirigirlas hacia la aplicación Node.js.

Configuración implementada:

| Parámetro | Valor |
|---|---|
| Puerto HTTP | 80 |
| Servidor | Nginx |
| Aplicación de destino | Node.js |
| Dirección del proxy | `http://127.0.0.1:3000` |

El flujo de las solicitudes es:

1. El cliente realiza una solicitud HTTP al servidor EC2.
2. Nginx recibe la solicitud por el puerto 80.
3. Nginx la reenvía a Node.js mediante el puerto 3000.
4. Express procesa la solicitud y devuelve la respuesta.

La API fue comprobada desde un equipo externo mediante el acceso HTTP
a la instancia EC2.

## 10. Endpoints de la API REST


La API utiliza la siguiente estructura de rutas:

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/` | Información general de la API |
| GET | `/health` | Estado del servicio |
| GET | `/libros` | Listar todos los libros |
| GET | `/libros/:id` | Consultar un libro |
| POST | `/libros` | Registrar un libro |
| PUT | `/libros/:id` | Actualizar un libro |
| DELETE | `/libros/:id` | Eliminar un libro |

### 10.1 Registrar un libro

**POST** `/libros`

Ejemplo de cuerpo JSON:

```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "editorial": "Prentice Hall",
  "anio_publicacion": 2008,
  "precio": 45.50,
  "stock": 10
}
```

### 10.2 Consultar todos los libros

**GET** `/libros`

Devuelve el total de registros y la lista de libros.

### 10.3 Consultar un libro

**GET** `/libros/1`

Consulta un registro utilizando su identificador.

### 10.4 Actualizar un libro

**PUT** `/libros/1`

Permite modificar los datos de un libro existente.

### 10.5 Eliminar un libro

**DELETE** `/libros/1`

Elimina el registro correspondiente al identificador proporcionado.

## 11. Validaciones y códigos HTTP

La aplicación incorpora validaciones para los datos recibidos y utiliza los siguientes códigos HTTP:

| Código | Significado |
|---|---|
| 200 | Operación realizada correctamente |
| 201 | Registro creado correctamente |
| 400 | Datos inválidos |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

Las operaciones de consulta, inserción, actualización y eliminación utilizan consultas SQL parametrizadas.

## 12. Seguridad implementada

Se aplicaron las siguientes medidas:

- Uso de variables de entorno para credenciales.
- Exclusión de archivos sensibles mediante `.gitignore`.
- Protección del certificado CA de RDS.
- Conexión TLS hacia Amazon RDS.
- Validación del certificado mediante `rejectUnauthorized: true`.
- Consultas SQL parametrizadas para reducir riesgos de inyección SQL.
- Restricción del acceso a RDS mediante Security Groups.
- Separación de la configuración de conexión y la lógica de negocio.

## 13. Pruebas realizadas

Se realizaron las siguientes comprobaciones:

- Acceso SSH a la instancia EC2.
- Conectividad desde EC2 hacia Amazon RDS.
- Verificación de la base de datos `com610_db`.
- Comprobación de la versión MySQL 8.4.11.
- Verificación de la existencia de la tabla `libros`.
- Prueba de conexión TLS con RDS.
- Implementación y comprobación de las operaciones CRUD: crear, consultar, actualizar y eliminar libros.
- Verificación de la persistencia de los registros en Amazon RDS MySQL.
- Prueba de acceso HTTP externo a la API mediante Nginx.
- Validaciones de entrada y respuestas HTTP.

## 14. Evidencias

Las capturas de pantalla de la infraestructura AWS se encuentran en el directorio `evidencias/`.

| Archivo | Evidencia |
|---|---|
| `01-com610-VPC-sg.png` | Configuración de red y seguridad |
| `02-com610-ec2-sg.png` | Security Group de EC2 |
| `03-com610-rds-sg.png` | Security Group de RDS |

## 15. Repositorio

**GitHub:**
https://github.com/willanflores049-png/com610-examen-parcial

**Rama principal:** `main`

## 16. Autor
Quispe Flores Willan
Universidad San Francisco Xavier de Chuquisaca.
