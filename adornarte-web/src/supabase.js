// v4
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL      = 'https://zhqmjonrtzulfdiimiba.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocW1qb25ydHp1bGZkaWltaWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMjc5NjYsImV4cCI6MjA4ODcwMzk2Nn0.1QpbuL1Z4smfyEUNnTI9nSSIRXzPnPFD6sVCm2nYpSQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
