# Segundo Examen Parcial - COM610

**Universidad San Francisco Xavier de Chuquisaca**

Proyecto: API REST para gestionar un catálogo de libros.

## Tecnologías

- Amazon EC2
- Amazon RDS MySQL
- Ubuntu Server
- Node.js
- Express
- Nginx
- Git y GitHub

## Arquitectura

La aplicación estará desplegada en Amazon EC2.
Nginx funcionará como proxy inverso y Node.js gestionará
las solicitudes de la API REST.

Los datos se almacenarán de forma persistente en Amazon RDS MySQL.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | /health | Estado del servicio |
| GET | /libros | Listar libros |
| GET | /libros/:id | Consultar libro |
| POST | /libros | Crear libro |
| PUT | /libros/:id | Actualizar libro |
| DELETE | /libros/:id | Eliminar libro |

## Instalación

Pendiente de completar.

## Variables de entorno

Consultar `.env.example`.

## Base de datos

El archivo `db.sql` contiene el esquema de la base de datos.

## Pruebas

Pendiente de documentar.

## Recursos AWS

- Región: us-east-1
- EC2: Pendiente
- RDS: Pendiente
- Security Groups: com610-ec2-sg y com610-rds-sg

## Evidencias

Las capturas del despliegue y las pruebas se almacenarán
en la carpeta `evidencias/`.

## Autor

Estudiante COM610 - 2/2026
