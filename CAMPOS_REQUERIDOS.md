# 📋 Resumen de Campos Requeridos

## ✅ Campos Obligatorios

### 1. **NOMBRE** - REQUERIDO ✓
- **Tipo**: String (texto)
- **Mínimo**: 3 caracteres
- **Máximo**: 100 caracteres
- **Ejemplo**: `"Juan Pérez"`

**Validación**:
```javascript
if (!nombre || nombre.trim().length < 3) {
  return error: "El nombre es requerido y debe tener mínimo 3 caracteres"
}
```

---

### 2. **EMAIL** - REQUERIDO ✓
- **Tipo**: String (texto)
- **Formato**: usuario@dominio.extensión
- **Validación**: Expresión regular `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Ejemplo**: `"juan@example.com"`

**Validación**:
```javascript
if (!email || !regex.test(email)) {
  return error: "El email es requerido y debe tener formato válido"
}
```

**Formatos Válidos**:
- ✅ juan@example.com
- ✅ maria.garcia@domain.co
- ✅ user123@mail.org

**Formatos Inválidos**:
- ❌ juan (falta @)
- ❌ juan@ (falta dominio)
- ❌ juan@example (falta extensión)
- ❌ @example.com (falta usuario)

---

### 3. **EDAD** - REQUERIDO ✓
- **Tipo**: Número (integer)
- **Mínimo**: 18 años (obligatorio por negocio)
- **Máximo**: 120 años
- **Ejemplo**: `25`

**Validación**:
```javascript
if (!edad || edad < 18) {
  return error: "La edad es requerida y debe ser >= 18 años"
}
```

**Edades Válidas**:
- ✅ 18
- ✅ 25
- ✅ 65
- ✅ 120

**Edades Inválidas**:
- ❌ 17 (menor a 18)
- ❌ 0 (menor a 18)
- ❌ -5 (negativo)
- ❌ 150 (mayor a 120)
- ❌ "veinticinco" (no es número)

---

### 4. **ID** - AUTO GENERADO (NO REQUERIDO) ✗
- **Tipo**: Número (BIGSERIAL)
- **Generado por**: Supabase automáticamente
- **Acción**: NO ENVIAR en peticiones POST/PUT
- **Ejemplo**: `1`, `2`, `3` (se asigna automáticamente)

**Importante**: 
- ❌ NO incluyas `id` en el body del POST
- ✅ Se genera automáticamente en Supabase
- ✅ Se retorna en la respuesta

---

### 5. **fechaCreacion** - AUTO GENERADA (NO REQUERIDA) ✗
- **Tipo**: Timestamp
- **Generado por**: Supabase (CURRENT_TIMESTAMP)
- **Acción**: NO ENVIAR en peticiones
- **Ejemplo**: `"2025-12-09T16:46:15.424126"`

---

## 📝 Ejemplos de Peticiones

### ✅ POST VÁLIDO - Crear Usuario
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "edad": 25
}
```

**Respuesta Exitosa (201)**:
```json
{
  "exito": true,
  "mensaje": "Usuario creado correctamente",
  "datos": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "edad": 25,
    "fechaCreacion": "2025-12-09T16:46:15.424126"
  }
}
```

---

### ❌ POST INVÁLIDO - Falta Nombre
```json
{
  "email": "juan@example.com",
  "edad": 25
}
```

**Respuesta Error (400)**:
```json
{
  "exito": false,
  "mensaje": "El nombre es requerido"
}
```

---

### ❌ POST INVÁLIDO - Edad Menor a 18
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "edad": 17
}
```

**Respuesta Error (400)**:
```json
{
  "exito": false,
  "mensaje": "La edad debe ser mayor o igual a 18 años"
}
```

---

### ❌ POST INVÁLIDO - Email Mal Formado
```json
{
  "nombre": "Juan Pérez",
  "email": "juan-sin-arroba",
  "edad": 25
}
```

**Respuesta Error (400)**:
```json
{
  "exito": false,
  "mensaje": "El email no tiene un formato válido"
}
```

---

### ❌ POST INVÁLIDO - Nombre Muy Corto
```json
{
  "nombre": "Jo",
  "email": "juan@example.com",
  "edad": 25
}
```

**Respuesta Error (400)**:
```json
{
  "exito": false,
  "mensaje": "El nombre debe tener al menos 3 caracteres"
}
```

---

## 🔄 Actualizar Usuario (PUT)

### ✅ PUT VÁLIDO - Actualizar Solo Edad
```json
{
  "edad": 26
}
```

Los campos no enviados se mantienen sin cambios.

### ✅ PUT VÁLIDO - Actualizar Múltiples Campos
```json
{
  "nombre": "Juan Carlos Pérez",
  "email": "juancarlos@example.com",
  "edad": 26
}
```

---

## 📊 Tabla Resumen

| Campo | Requerido | Tipo | Validaciones |
|-------|-----------|------|--------------|
| **id** | ❌ No | Número | Autogenerado |
| **nombre** | ✅ Sí | String | 3-100 caracteres |
| **email** | ✅ Sí | String | Formato válido |
| **edad** | ✅ Sí | Número | >= 18 y <= 120 |
| **fechaCreacion** | ❌ No | Timestamp | Autogenerado |

---

**⚠️ Recuerda:**
- Los 3 campos (nombre, email, edad) son REQUERIDOS
- ID y fechaCreacion se generan automáticamente
- NO envíes ID ni fechaCreacion en tus peticiones
- Todas las validaciones se aplican en backend Y frontend

---

**Última actualización**: 9 de diciembre de 2025
