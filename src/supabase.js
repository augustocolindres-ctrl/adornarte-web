import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL      = import.meta.env.REACT_APP_SUPABASE_URL      || '';
const SUPABASE_ANON_KEY = import.meta.env.REACT_APP_SUPABASE_ANON_KEY || '';

/* Si las variables de entorno están vacías, devuelve un stub offline para
   que la app nunca explote antes de llegar al login */
let supabase;
try {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('env missing');
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch(e) {
  console.warn('Supabase no configurado — modo offline:', e.message);
  const noop = () => Promise.resolve({ data: [], error: { message: 'offline' } });
  const qb   = () => ({ select: noop, insert: noop, upsert: noop, update: noop,
                         delete: noop, order: () => ({ limit: noop }), limit: noop });
  supabase = {
    from:          () => qb(),
    channel:       () => ({ on(){ return this; }, subscribe(){ return this; } }),
    removeChannel: () => {},
    auth: {
      getSession:         () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange:  () => ({ data: { subscription: { unsubscribe: ()=>{} } } }),
      signInWithPassword: () => Promise.resolve({ error: { message: 'offline' } }),
      signUp:             () => Promise.resolve({ error: { message: 'offline' } }),
      signOut:            () => Promise.resolve({}),
    },
  };
}

export { supabase };
