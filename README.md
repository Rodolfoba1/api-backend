# API CRUD de Usuarios

Aplicación de API REST para gestionar usuarios con operaciones CRUD completas.

## 📋 Estructura del Proyecto

```
api/
├── src/
│   ├── controllers/
│   │   └── usuarioController.js    # Lógica de negocio para usuarios
│   ├── models/
│   │   └── usuario.js              # Modelo de datos de usuarios
│   ├── routes/
│   │   └── usuarios.js             # Rutas de API
│   └── middleware/
├── server.js                        # Archivo principal del servidor
├── package.json                     # Dependencias del proyecto
└── README.md                        # Este archivo
```

## 🚀 Instalación y Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## 📡 Endpoints API

### 1. Obtener todos los usuarios
```
GET /usuarios
```

**Respuesta:**
```json
{
  "exito": true,
  "mensaje": "Usuarios obtenidos correctamente",
  "datos": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "edad": 30,
      "fechaCreacion": "2025-12-06T10:30:00.000Z"
    }
  ],
  "cantidad": 1
}
```

### 2. Obtener usuario por ID
```
GET /usuarios/:id
```

**Ejemplo:**
```
GET /usuarios/1
```

**Respuesta:**
```json
{
  "exito": true,
  "mensaje": "Usuario obtenido correctamente",
  "datos": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "edad": 30,
    "fechaCreacion": "2025-12-06T10:30:00.000Z"
  }
}
```

### 3. Crear nuevo usuario
```
POST /usuarios
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "edad": 30
}
```

**Respuesta (201):**
```json
{
  "exito": true,
  "mensaje": "Usuario creado correctamente",
  "datos": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "edad": 30,
    "fechaCreacion": "2025-12-06T10:30:00.000Z"
  }
}
```

### 4. Actualizar usuario
```
PUT /usuarios/:id
Content-Type: application/json
```

**Ejemplo:**
```
PUT /usuarios/1
```

**Body (actualizar algunos campos):**
```json
{
  "nombre": "Juan Carlos Pérez",
  "edad": 31
}
```

**Respuesta:**
```json
{
  "exito": true,
  "mensaje": "Usuario actualizado correctamente",
  "datos": {
    "id": 1,
    "nombre": "Juan Carlos Pérez",
    "email": "juan@example.com",
    "edad": 31,
    "fechaCreacion": "2025-12-06T10:30:00.000Z"
  }
}
```

### 5. Eliminar usuario
```
DELETE /usuarios/:id
```

**Ejemplo:**
```
DELETE /usuarios/1
```

**Respuesta:**
```json
{
  "exito": true,
  "mensaje": "Usuario eliminado correctamente",
  "datos": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "edad": 30,
    "fechaCreacion": "2025-12-06T10:30:00.000Z"
  }
}
```

## ⚙️ Códigos de Estado HTTP

- **200**: OK - Operación exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Datos inválidos o incompletos
- **404**: Not Found - Usuario no encontrado
- **500**: Internal Server Error - Error del servidor

## 🧪 Pruebas con cURL

### Crear usuario
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "email": "maria@example.com",
    "edad": 28
  }'
```

### Obtener todos los usuarios
```bash
curl http://localhost:3000/usuarios
```

### Obtener usuario específico
```bash
curl http://localhost:3000/usuarios/1
```

### Actualizar usuario
```bash
curl -X PUT http://localhost:3000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "edad": 29
  }'
```

### Eliminar usuario
```bash
curl -X DELETE http://localhost:3000/usuarios/1
```

## 📝 Características

✅ Operaciones CRUD completas  
✅ Validación de datos  
✅ Manejo de errores  
✅ Respuestas JSON consistentes  
✅ CORS habilitado  
✅ Almacenamiento en memoria (escalable a base de datos)  
✅ IDs autoincremental  

## 🔄 Próximas Mejoras (Opcional)

- Integración con base de datos (MongoDB, PostgreSQL, etc.)
- Autenticación y autorización
- Validación más robusta (email, formato, etc.)
- Paginación de resultados
- Búsqueda y filtrado de usuarios
- Logging
- Tests unitarios y de integración
- Swagger/OpenAPI documentation

---

**Desarrollado con Express.js** ✨
