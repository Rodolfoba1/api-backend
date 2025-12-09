const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./src/routes/usuarios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/usuarios', usuariosRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Usuarios - CRUD',
    version: '1.0.0',
    endpoints: {
      obtenerTodos: 'GET /usuarios',
      obtenerPorId: 'GET /usuarios/:id',
      crear: 'POST /usuarios',
      actualizar: 'PUT /usuarios/:id',
      eliminar: 'DELETE /usuarios/:id'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    exito: false,
    mensaje: 'Error interno del servidor',
    error: err.message
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📝 API de Usuarios disponible en http://localhost:${PORT}/usuarios`);
  console.log(`✅ Node.js versión: ${process.version}`);
});

module.exports = app;
