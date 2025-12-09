const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

// Rutas CRUD para usuarios
router.get('/', usuarioController.obtenerTodos);           // GET todos los usuarios
router.get('/:id', usuarioController.obtenerPorId);       // GET usuario por ID
router.post('/', usuarioController.crearUsuario);         // POST crear nuevo usuario
router.put('/:id', usuarioController.actualizarUsuario);  // PUT actualizar usuario
router.delete('/:id', usuarioController.eliminarUsuario); // DELETE eliminar usuario

module.exports = router;
