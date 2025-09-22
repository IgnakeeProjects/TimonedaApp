const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

// Definir el tipo Env basado en las claves requeridas
type RequiredKey = typeof required[number]; // 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
type Env = Record<RequiredKey, string>; // Asegurar que todas las variables requeridas estén presentes

const missing = required.filter(k => !process.env[k]);

if (missing.length) {
  throw new Error(
    `Variables de entorno faltantes: ${missing.join(', ')}`
  );
}

// Construir el objeto env con las variables requeridas
export const env: Env = Object.freeze(
  required.reduce((acc, key) => {
    acc[key] = process.env[key] as string;
    return acc;
  }, {} as Env)
);

// Log sólo en desarrollo (sin exponer el anon key completo)
if (process.env.NODE_ENV === 'development') {
  console.log('[env] NEXT_PUBLIC_SUPABASE_URL =', env.NEXT_PUBLIC_SUPABASE_URL);
}