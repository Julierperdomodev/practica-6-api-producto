# API REST de Productos — Práctica 6

API REST desarrollada con **Node.js** y **Express** para gestionar productos en memoria (CRUD completo con validaciones de campos obligatorios y precio numérico mayor que cero).

## Requisitos e instalación

1. Instalar dependencias:
   npm install
2. Ejecutar el servidor en desarrollo:
   node --watch app.js
   El servidor quedará disponible en http://localhost:3000.

## Endpoints

- GET /productos — Obtiene el listado de productos (200 OK)
- POST /productos — Crea un nuevo producto con nombre, descripcion y precio (201 Created / 400 Bad Request)
- PUT /productos/:id — Actualiza un producto existente por id (200 OK / 404 Not Found)
- DELETE /productos/:id — Elimina un producto existente por id (200 OK / 404 Not Found)
