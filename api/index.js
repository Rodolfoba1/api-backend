import express from 'express';
import cors from 'cors';
import usuariosRoutes from '../src/routes/usuarios.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.json({
    exito: true,
    mensaje: 'API de Usuarios - Endpoints disponibles',
    endpoints: {
      obtenerTodos: 'GET /api/usuarios',
      obtenerPorId: 'GET /api/usuarios/:id',
      crear: 'POST /api/usuarios',
      actualizar: 'PUT /api/usuarios/:id',
      eliminar: 'DELETE /api/usuarios/:id'
    }
  });
});

app.use('/api/usuarios', usuariosRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: 'Ruta no encontrada',
    ruta: req.url
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    exito: false,
    mensaje: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;
