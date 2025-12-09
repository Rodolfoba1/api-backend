// Funciones de validación para usuarios

/**
 * Validar que el nombre no esté vacío y tenga al menos 3 caracteres
 */
const validarNombre = (nombre) => {
  if (!nombre || typeof nombre !== 'string') {
    return { valido: false, mensaje: 'El nombre es requerido y debe ser texto' };
  }
  const nombreLimpio = nombre.trim();
  if (nombreLimpio.length < 3) {
    return { valido: false, mensaje: 'El nombre debe tener al menos 3 caracteres' };
  }
  if (nombreLimpio.length > 100) {
    return { valido: false, mensaje: 'El nombre no puede exceder 100 caracteres' };
  }
  return { valido: true };
};

/**
 * Validar que el email tenga formato válido
 */
const validarEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valido: false, mensaje: 'El email es requerido y debe ser texto' };
  }
  // Expresión regular para validar email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return { valido: false, mensaje: 'El email no tiene un formato válido' };
  }
  return { valido: true };
};

/**
 * Validar que la edad sea un número mayor o igual a 18
 */
const validarEdad = (edad) => {
  if (edad === undefined || edad === null || edad === '') {
    return { valido: false, mensaje: 'La edad es requerida' };
  }
  
  const edadNumero = parseInt(edad, 10);
  
  if (isNaN(edadNumero) || edadNumero.toString() !== parseInt(edad, 10).toString()) {
    return { valido: false, mensaje: 'La edad debe ser un número entero válido' };
  }
  
  if (edadNumero < 18) {
    return { valido: false, mensaje: 'La edad debe ser mayor o igual a 18 años' };
  }
  
  if (edadNumero > 120) {
    return { valido: false, mensaje: 'La edad no puede ser mayor a 120 años' };
  }
  
  return { valido: true };
};

/**
 * Validar todos los campos para crear un usuario
 */
const validarUsuarioCompleto = (nombre, email, edad) => {
  // Validar nombre
  const validacionNombre = validarNombre(nombre);
  if (!validacionNombre.valido) {
    return validacionNombre;
  }

  // Validar email
  const validacionEmail = validarEmail(email);
  if (!validacionEmail.valido) {
    return validacionEmail;
  }

  // Validar edad
  const validacionEdad = validarEdad(edad);
  if (!validacionEdad.valido) {
    return validacionEdad;
  }

  return { valido: true };
};

module.exports = {
  validarNombre,
  validarEmail,
  validarEdad,
  validarUsuarioCompleto
};
