import { createClient } from '@supabase/supabase-js';

const env = import.meta.env || {};
const SUPABASE_URL =
  env.VITE_SUPABASE_URL ||
  env.REACT_APP_SUPABASE_URL ||
  '';

const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  env.REACT_APP_SUPABASE_KEY ||
  env.REACT_APP_SUPABASE_ANON_KEY ||
  '';

let supabase = null;
let supabaseReady = false;

try {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase no configurado: faltan variables de entorno');
  } else {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    supabaseReady = true;
  }
} catch (e) {
  console.warn('Error iniciando Supabase:', e?.message || e);
  supabase = null;
  supabaseReady = false;
}

export { supabase, supabaseReady };
