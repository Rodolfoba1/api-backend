// Cargar variables de entorno
require('dotenv').config();

// Configuración de Supabase
const { createClient } = require('@supabase/supabase-js');

// Variables de entorno
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Validar que las variables estén configuradas
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Faltan variables de entorno: SUPABASE_URL o SUPABASE_KEY en .env');
}

// Crear cliente de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
