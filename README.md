KanbanPro
Proyecto integrador desarrollado durante el Bootcamp Full Stack — 3 sprints, de prototipo a MVP.
El proyecto
Una app para gestionar tareas de forma visual. Cada usuario se registra, inicia sesion y accede a su propio espacio donde puede crear tableros, organizarlos en columnas y agregar tarjetas con colores.
Los datos viven en PostgreSQL. La autenticacion usa JWT con contrasenas hasheadas en bcrypt. El frontend se comunica con una API RESTful propia.
Stack

Backend: Node.js, Express
Vistas: Handlebars
Base de datos: PostgreSQL con Sequelize
Auth: JWT + bcryptjs

Correr el proyecto
Clonar e instalar:
bashgit clone https://github.com/pedro-perezr/KanbanPro.git
cd KanbanPro
npm install
Configurar el .env:
DB_NAME=KanbanPro
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=tu_clave_secreta
Iniciar:
bashnode app.js
Entrar a http://localhost:3000, registrarse y listo.
Endpoints
El token del login va en el header de cada request:
Authorization: Bearer <token>
Auth
POST /api/auth/register
POST /api/auth/login
Tableros
GET    /api/tableros
POST   /api/tableros
PUT    /api/tableros/:id
DELETE /api/tableros/:id
Columnas
POST   /api/tableros/:tableroId/listas
PUT    /api/tableros/:tableroId/listas/:id
DELETE /api/tableros/:tableroId/listas/:id
Tarjetas
POST   /api/listas/:listaId/tarjetas
PUT    /api/listas/:listaId/tarjetas/:id
DELETE /api/listas/:listaId/tarjetas/:id
