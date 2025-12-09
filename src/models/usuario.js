
// Integración con Supabase
const supabase = require('../config/supabase');

// Obtener todos los usuarios
const obtenerTodos = async () => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*');
  
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Obtener usuario por ID
const obtenerPorId = async (id) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code === 'PGRST116') {
    return null; // No encontrado
  }
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Crear nuevo usuario
const crear = async (nombre, email, edad) => {
  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nombre, email, edad }])
    .select();
  
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

// Actualizar usuario
const actualizar = async (id, datos) => {
  const usuario = await obtenerPorId(id);
  if (!usuario) return null;
  
  const actualizaciones = {};
  if (datos.nombre) actualizaciones.nombre = datos.nombre;
  if (datos.email) actualizaciones.email = datos.email;
  if (datos.edad) actualizaciones.edad = datos.edad;
  
  const { data, error } = await supabase
    .from('usuarios')
    .update(actualizaciones)
    .eq('id', id)
    .select();
  
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

// Eliminar usuario
const eliminar = async (id) => {
  const usuario = await obtenerPorId(id);
  if (!usuario) return null;
  
  const { error } = await supabase
    .from('usuarios')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw new Error(error.message);
  }
  return usuario;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};
