# API CRUD de Usuarios con Supabase

Aplicación de API REST para gestionar usuarios con operaciones CRUD completas, integrada con **Supabase** (PostgreSQL en la nube).

## 🎯 Características Principales

✅ **Operaciones CRUD** - Crear, leer, actualizar y eliminar usuarios  
✅ **Validaciones robustas** - Nombre (3-100 caracteres), email válido, edad >= 18  
✅ **Base de datos en la nube** - Supabase PostgreSQL  
✅ **IDs autogenerados** - BIGSERIAL por Supabase  
✅ **Timestamps automáticos** - Fecha de creación registrada  
✅ **CORS habilitado** - Compatible con frontend  
✅ **Manejo de errores completo** - Respuestas JSON consistentes  
✅ **Arquitectura modular** - Separación de responsabilidades  

## 📋 Estructura del Proyecto

```
api/
├── src/
│   ├── config/
│   │   └── supabase.js             # Configuración de conexión Supabase
│   ├── controllers/
│   │   └── usuarioController.js    # Lógica de negocio y validación
│   ├── models/
│   │   └── usuario.js              # Acceso a datos (Supabase)
│   ├── middleware/
│   │   └── validaciones.js         # Funciones de validación
│   └── routes/
│       └── usuarios.js             # Definición de rutas REST
├── server.js                        # Servidor Express principal
├── package.json                     # Dependencias del proyecto
├── .env                             # Variables de entorno (NO SUBIR)
├── .gitignore                       # Archivos excluidos de git
├── README.md                        # Este archivo
├── CAMPOS_REQUERIDOS.md             # Especificación de campos
├── VALIDACIONES.md                  # Detalles de validaciones
├── ANALISIS_CODIGO.md               # Análisis de calidad del código
└── REFACTORIZACIÓN_MODULAR.md       # Propuesta de mejoras
```

## 🚀 Instalación y Uso

### 1. Requisitos Previos
- Node.js v14+ instalado
- Cuenta de Supabase (gratuita en https://supabase.com)
- Git instalado

### 2. Clonar el repositorio
```bash
git clone https://github.com/Rodolfoba1/api-backend.git
cd api-backend
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-clave-anonima-supabase
```

**Obtener tus credenciales:**
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a Settings → API
4. Copia `Project URL` y `anon public key`

### 5. Crear tabla en Supabase

Ejecuta esta SQL en tu proyecto Supabase:

```sql
CREATE TABLE usuarios (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  edad INTEGER NOT NULL,
  fechaCreacion TIMESTAMP DEFAULT NOW()
);
```

### 6. Iniciar el servidor
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

**Output esperado:**
```
🚀 Servidor ejecutándose en http://localhost:3000
```

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

## 🔄 Próximas Mejoras

- [ ] **Logging**: Implementar Winston/Pino para auditoría
- [ ] **Rate Limiting**: Proteger contra brute force
- [ ] **Testing**: Jest para tests unitarios e integración
- [ ] **Autenticación**: JWT tokens para seguridad
- [ ] **Swagger**: Documentación interactiva OpenAPI
- [ ] **Variables de entorno**: Configuración por ambiente (dev, test, prod)
- [ ] **Paginación**: Limitar resultados de listados
- [ ] **Búsqueda**: Filtrado avanzado de usuarios

## 📚 Documentación Adicional

- **[CAMPOS_REQUERIDOS.md](./CAMPOS_REQUERIDOS.md)** - Especificación de campos y tipos de datos
- **[VALIDACIONES.md](./VALIDACIONES.md)** - Detalles de las reglas de validación
- **[ANALISIS_CODIGO.md](./ANALISIS_CODIGO.md)** - Análisis de calidad y arquitectura
- **[REFACTORIZACIÓN_MODULAR.md](./REFACTORIZACIÓN_MODULAR.md)** - Propuesta de mejoras frontend
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Guía de configuración Supabase

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT - ver archivo LICENSE para más detalles.

## 👤 Autor

**Rodolfoba1**
- GitHub: [@Rodolfoba1](https://github.com/Rodolfoba1)
- Email: awirodolfo@gmail.com

---

**Stack Tecnológico:** Express.js • Node.js • Supabase • PostgreSQL  
**Última actualización:** Diciembre 2025
