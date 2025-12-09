const usuarioModel = require('../models/usuario');
const { validarUsuarioCompleto, validarNombre, validarEmail, validarEdad } = require('../middleware/validaciones');

// GET - Obtener todos los usuarios
const obtenerTodos = async (req, res) => {
  try {
    const usuarios = await usuarioModel.obtenerTodos();
    res.status(200).json({
      exito: true,
      mensaje: 'Usuarios obtenidos correctamente',
      datos: usuarios,
      cantidad: usuarios.length
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

// GET - Obtener usuario por ID
const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioModel.obtenerPorId(id);
    
    if (!usuario) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      exito: true,
      mensaje: 'Usuario obtenido correctamente',
      datos: usuario
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener usuario',
      error: error.message
    });
  }
};

// POST - Crear nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, edad } = req.body;
    
    // Validar nombre
    const valNombre = validarNombre(nombre);
    if (!valNombre.valido) {
      return res.status(400).json({ exito: false, mensaje: valNombre.mensaje });
    }
    
    // Validar email
    const valEmail = validarEmail(email);
    if (!valEmail.valido) {
      return res.status(400).json({ exito: false, mensaje: valEmail.mensaje });
    }
    
    // Validar edad
    const valEdad = validarEdad(edad);
    if (!valEdad.valido) {
      return res.status(400).json({ exito: false, mensaje: valEdad.mensaje });
    }
    
    const nuevoUsuario = await usuarioModel.crear(nombre.trim(), email.toLowerCase().trim(), parseInt(edad));
    
    res.status(201).json({
      exito: true,
      mensaje: 'Usuario creado correctamente',
      datos: nuevoUsuario
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al crear usuario',
      error: error.message
    });
  }
};

// PUT - Actualizar usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    
    if (!datos.nombre && !datos.email && !datos.edad && Object.keys(datos).length === 0) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Proporciona al menos un campo para actualizar'
      });
    }

    // Validar campos si se proporcionan
    if (datos.nombre) {
      const validacionNombre = validarNombre(datos.nombre);
      if (!validacionNombre.valido) {
        return res.status(400).json({
          exito: false,
          mensaje: validacionNombre.mensaje
        });
      }
    }

    if (datos.email) {
      const validacionEmail = validarEmail(datos.email);
      if (!validacionEmail.valido) {
        return res.status(400).json({
          exito: false,
          mensaje: validacionEmail.mensaje
        });
      }
    }

    if (datos.edad !== undefined) {
      const validacionEdad = validarEdad(datos.edad);
      if (!validacionEdad.valido) {
        return res.status(400).json({
          exito: false,
          mensaje: validacionEdad.mensaje
        });
      }
    }
    
    // Limpiar datos
    const datosLimpiados = {};
    if (datos.nombre) datosLimpiados.nombre = datos.nombre.trim();
    if (datos.email) datosLimpiados.email = datos.email.toLowerCase().trim();
    if (datos.edad !== undefined) datosLimpiados.edad = parseInt(datos.edad);

    const usuarioActualizado = await usuarioModel.actualizar(id, datosLimpiados);
    
    if (!usuarioActualizado) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      exito: true,
      mensaje: 'Usuario actualizado correctamente',
      datos: usuarioActualizado
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar usuario',
      error: error.message
    });
  }
};

// DELETE - Eliminar usuario
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await usuarioModel.eliminar(id);
    
    if (!usuarioEliminado) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      exito: true,
      mensaje: 'Usuario eliminado correctamente',
      datos: usuarioEliminado
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar usuario',
      error: error.message
    });
  }
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
